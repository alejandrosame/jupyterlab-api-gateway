import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette
} from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { jupyterIcon } from '@jupyterlab/ui-components';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { Menu } from '@lumino/widgets';
import { IService } from './tokens';
import { ApiGatewayWidget } from './widgets/ApiGatewayWidget';

// Load configuration
import config from './config';

/**
 * Initialization data for the jupyterlab-api-gateway extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-api-gateway',
  autoStart: true,
  requires: [
    IMainMenu,
    ICommandPalette,
    ILayoutRestorer,
  ],
  activate: async (
    app: JupyterFrontEnd,
    mainMenu: IMainMenu,
    palette: ICommandPalette,
    restorer: ILayoutRestorer
  ) => {
    console.log('JupyterLab extension jupyterlab-api-gateway is activated!');

    let services: IService[] = [];

    const url = new URL(config.ApiUrl);
    const response = await fetch( url.toString(), {} );
    const data = await response.json();
    services = data.apis;

    let settings: ISettingRegistry.ISettings;

    // Create the API Gateway widget sidebar
    const apiGatewayPlugin = new ApiGatewayWidget(
      settings,
      app.commands,
      services
    );
    apiGatewayPlugin.id = 'jp-api-gateway';
    apiGatewayPlugin.title.icon = jupyterIcon;
    apiGatewayPlugin.title.caption = 'API Gateway';

    // Let the application restorer track the running panel for restoration of
    // application state (e.g. setting the running panel as the current side bar
    // widget).
    restorer.add(apiGatewayPlugin, 'api-gateway');

    // Rank has been chosen somewhat arbitrarily to give priority to the running
    // sessions widget in the sidebar.
    app.shell.add(apiGatewayPlugin, 'left', { rank: 200 });


    // Add mock command to 'Marketplace' section
    const command: string = 'marketplace:generate';
    app.commands.addCommand(command, {
      label: 'Add code snippet',
      execute: () => {
        console.log('Invoke code generation');
      }
    });

    // Add a menu for the plugin
    const commands = app.commands;
    const menu = new Menu({ commands });
    mainMenu.addMenu(menu, { rank: 60 });
  }
};

export default extension;
