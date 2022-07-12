// Copyright (c) Mike Bender
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';
// import { v4 as uuidv4 } from 'uuid';
// import dh from '@deephaven/jsapi-shim';
import Log from '@deephaven/log';
import { MODULE_NAME, MODULE_VERSION } from './version';

const log = Log.module('dhc-jupyter.widget');

// Import the CSS
import '../css/widget.css';

export class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      value: 'Hello World',
      port: -1,
      table_id: 'UNKNOWN_ID',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class ExampleView extends DOMWidgetView {
  private iframe: HTMLIFrameElement;

  render() {
    const serverUrl = this.model.get('server_url');
    const tableId = this.model.get('table_id');
    const iframeUrl = `${serverUrl}/iframe/table/?name=${tableId}`;
    log.info('init_element for widget', tableId, serverUrl, iframeUrl);

    this.iframe = document.createElement('iframe');
    this.iframe.src = iframeUrl;
    this.el.appendChild(this.iframe);
  }
}
