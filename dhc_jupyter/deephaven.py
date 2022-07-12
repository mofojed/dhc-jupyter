#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Mike Bender.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget, Widget
from traitlets import Unicode, Integer
from deephaven_server import Server
from uuid import uuid4
from ._frontend import module_name, module_version

class DeephavenWidget(DOMWidget):
    """A wrapper for viewing DeephavenWidgets in IPython
    """
    _model_name = Unicode('ExampleModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('ExampleView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    widget_id = Unicode().tag(sync=True)
    table_id = Unicode().tag(sync=True)
    server_url = Unicode().tag(sync=True)

    # We have to pass in the main `globals` so that we can assign our temporary table variable correctly
    def __init__(self, table, main_globals=globals()):
        super(DeephavenWidget, self).__init__()

        # Generate a new table ID using a UUID prepended with a `t_` prefix
        table_id = f"t_{str(uuid4()).replace('-', '_')}"

        self.set_trait('widget_id', self.model_id)
        self.set_trait('server_url', f"http://localhost:{Server.instance.port}")
        self.set_trait('table_id', table_id);

        # Add the table to the globals list so it can be retrieved
        main_globals[table_id] = table