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

# def _get_global_name(obj):
#   """Retrieve the global name of the object passed in"""
#   return globals().keys()
#   for name, value in globals().items():
#     if obj == value:
#       return name

class ExampleWidget(DOMWidget):
    """TODO: Add docstring here
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
    table = None

    # TODO: How do we convert from the table name itself to the actual table in the JS?
    # With the old Jupyter widget, we'd run Python code to assign it to a new variable..
    # Can we just use the existing var given that we know what the object is already?
    def __init__(self, table, main_globals=globals()):
        super(ExampleWidget, self).__init__()

        # Generate a new table ID using a UUID prepended with a `t_` prefix
        table_id = f"t_{str(uuid4()).replace('-', '_')}"

        self.table = table
        self.set_trait('widget_id', self.model_id)
        self.set_trait('server_url', f"http://localhost:{Server.instance.port}")
        self.set_trait('table_id', table_id);

        # Add the table to the globals list so it can be retrieved
        # Need to use `builtins` because each module has their own `globals` namespace
        main_globals[table_id] = table
        # exec(f"globals()['{table_id}'] = table")
        # exec(f"import builtins\nbuiltins.{table_id} = table")
        # globals()[table_id] = table

        # # TODO: Setting this for debug purposes...
        # # self.widget_globals = globals()

        # # Generate the iframe URL and set the value
        # self.set_trait('value', f"http://localhost:{Server.instance.port}/iframe/table/?name={table_id}")
        # self.set_trait('table_id', table_id)
        # self.set_trait('my_globals', str(globals()))

    # def get_globals(self):
    #   return globals()
