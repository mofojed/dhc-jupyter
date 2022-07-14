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

DEFAULT_WIDTH = 900
DEFAULT_HEIGHT = 600
DEFAULT_SERVER_URL = "http://localhost:8080"

class DeephavenWidget(DOMWidget):
    _globals = globals()
    _default_width = DEFAULT_WIDTH
    _default_height = DEFAULT_HEIGHT
    _default_server_url = DEFAULT_SERVER_URL

    # Need to call the initialize method to correctly set the globals var
    @staticmethod
    def init(globals, width=DEFAULT_WIDTH, height=DEFAULT_HEIGHT, url=DEFAULT_SERVER_URL):
      DeephavenWidget._globals = globals
      DeephavenWidget._default_server_url = url
      DeephavenWidget._default_width = width
      DeephavenWidget._default_height = height

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
    width = Integer().tag(sync=True)
    height = Integer().tag(sync=True)


    # We have to pass in the main `globals` so that we can assign our temporary table variable correctly
    def __init__(self, table, width=_default_width, height=_default_height, url=_default_server_url):
        super(DeephavenWidget, self).__init__()

        # Generate a new table ID using a UUID prepended with a `t_` prefix
        table_id = f"t_{str(uuid4()).replace('-', '_')}"

        # Add the table to the globals list so it can be retrieved by the iframe
        DeephavenWidget._globals[table_id] = table

        self.set_trait('widget_id', self.model_id)
        self.set_trait('server_url', url)
        self.set_trait('table_id', table_id)
        self.set_trait('width', width)
        self.set_trait('height', height)