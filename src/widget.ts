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
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
    }
    this.el.appendChild(this.iframe);

    // this.el.classList.add('custom-widget');

    this.init_element();
    // this.model.on('change:value', this.update_element, this);
    // this.model.on('change:my_globals', this.update_element, this);
    // this.model.on('change:model_id', this.update_element, this);
  }

  //   async init_element() {
  //     const serverUrl = this.model.get('server_url');
  //     const widgetId = this.model.get('widget_id');
  //     log.info('init_element for widget', widgetId, serverUrl);

  //     // We need to generate an ID, connect to a session, and assign the table to a new variable
  //     const tableId = `widget_t_${uuidv4().replace(/-/g, '_')}`;

  //     log.info('tableId', tableId);

  //     const connection = new dh.IdeConnection(serverUrl);

  //     log.info('connection', connection);

  //     // await connection.getConsoleTypes();

  //     const ide = await connection.startSession('python');

  //     log.info('ide', ide);

  //     const code = `
  // from ipywidgets import Widget
  // ${tableId} = Widget.widgets['${widgetId}'].table
  //     `;

  //     log.info('running code', code);

  //     const result = await (ide as any).runCode(code);
  //     // connection = new dh.IdeConnection(window.location.protocol + "//" + window.location.host);

  //     const iframeUrl = `${serverUrl}/iframe/table/?name=${tableId}`;

  //     log.info('code ran! opening table in iframe...', result, iframeUrl);

  //     this.iframe.src = iframeUrl;

  //     // this.iframe.src = this.model.get('value');
  //     // this.el.textContent = `model_id--->${this.model.get('model_id')}`;
  //     // this.el.textContent = `text--->${this.model.get('value')},${this.model.get(
  //     //   'table_id'
  //     // )},${this.model.get('port')}`;
  //   }

  async init_element() {
    const serverUrl = this.model.get('server_url');
    const tableId = this.model.get('table_id');
    const iframeUrl = `${serverUrl}/iframe/table/?name=${tableId}`;
    log.info('init_element for widget', tableId, serverUrl, iframeUrl);

    this.iframe.src = iframeUrl;

    // this.iframe.src = this.model.get('value');
    // this.el.textContent = `model_id--->${this.model.get('model_id')}`;
    // this.el.textContent = `text--->${this.model.get('value')},${this.model.get(
    //   'table_id'
    // )},${this.model.get('port')}`;
  }
}
