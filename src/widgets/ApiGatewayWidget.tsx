import { ReactWidget } from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CommandRegistry } from '@lumino/commands';
import { Widget } from '@lumino/widgets';
import * as React from 'react';
import { IService } from '../tokens';
import { ApiGatewayPanel } from '../components/ApiGatewayPanel';
import { ApiGatewayWidgetStyle } from '../style/ApiGatewayWidgetStyle';

/**
 * A class that exposes the API gateway Widget.
 */
export class ApiGatewayWidget extends ReactWidget {
  constructor(
    settings: ISettingRegistry.ISettings,
    commands: CommandRegistry,
    services: IService[],
    options?: Widget.IOptions
  ) {
    super(options);
    this.node.id = 'ApiGateway-root';
    this.addClass(ApiGatewayWidgetStyle);

    this._commands = commands;
    this._settings = settings;
    this._services = services;
  }

  render() {
    return (
      <ApiGatewayPanel
        commands={this._commands}
        settings={this._settings}
        services={this._services}
      />
    );
  }

  private _commands: CommandRegistry;
  private _settings: ISettingRegistry.ISettings;
  private _services: IService[];
}
