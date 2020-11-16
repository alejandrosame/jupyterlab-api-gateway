import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import * as React from 'react';
import { IApiGatewayExtension } from '../tokens';
import { ApiGatewayPanel } from '../components/ApiGatewayPanel';
import { ApiGatewayWidgetStyle } from '../style/ApiGatewayWidgetStyle';

/**
 * A class that exposes the API gateway Widget.
 */
export class ApiGatewayWidget extends ReactWidget {
  constructor(
    model: IApiGatewayExtension,
    options?: Widget.IOptions
  ) {
    super(options);
    this.node.id = 'ApiGateway-root';
    this._model = model;
    this.addClass(ApiGatewayWidgetStyle);
  }

  render() {
    return (
      <ApiGatewayPanel
        model={this._model}
      />
    );
  }

  _model: IApiGatewayExtension;
}
