// Copyright (c) Mike Bender
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';
import Log from '@deephaven/log';
import { MODULE_NAME, MODULE_VERSION } from './version';

const log = Log.module('deephaven-ipywidgets.widget');

// Import the CSS
import '../css/widget.css';

export class DeephavenModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: DeephavenModel.model_name,
      _model_module: DeephavenModel.model_module,
      _model_module_version: DeephavenModel.model_module_version,
      _view_name: DeephavenModel.view_name,
      _view_module: DeephavenModel.view_module,
      _view_module_version: DeephavenModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'DeephavenModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'DeephavenView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class DeephavenView extends DOMWidgetView {
  private iframe: HTMLIFrameElement;

  render() {
    const iframeUrl = this.model.get('iframe_url');
    const width = this.model.get('width');
    const height = this.model.get('height');
    log.info('init_element for widget', iframeUrl, width, height);

    this.iframe = document.createElement('iframe');
    this.iframe.src = iframeUrl;
    if (width > 0) {
      this.iframe.width = width;
      this.iframe.style.width = `${width}px`;
    }
    if (height > 0) {
      this.iframe.height = height;
      this.iframe.style.height = `${height}px`;
    }
    this.el.className = 'deephaven-ipywidgets-widget';
    this.el.appendChild(this.iframe);
  }
}
