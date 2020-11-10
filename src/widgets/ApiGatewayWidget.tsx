import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import * as React from 'react';
import { IApiGatewayExtension, IService } from '../tokens';
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
    this.addClass(ApiGatewayWidgetStyle);

    this._services = model.services;
  }

  render() {
    return (
      <ApiGatewayPanel
        services={this._services}
      />
    );
  }

  _services: IService[];
}
