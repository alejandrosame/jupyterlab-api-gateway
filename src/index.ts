import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { IStateDB } from '@jupyterlab/statedb';

import { ApiGatewayExtension } from './model';
import { ApiGatewayWidget } from './widgets/ApiGatewayWidget';
import { apiGatewayIcon } from './style/icons';

import { IApiGatewayExtension } from './tokens';

const EXTENSION_ID = 'jupyterlab-api-gateway';

/**
 * Initialization data for the jupyterlab-api-gateway extension.
 */
const extension: JupyterFrontEndPlugin<IApiGatewayExtension> = {
  id: EXTENSION_ID,
  autoStart: true,
  requires: [
    ILayoutRestorer,
    INotebookTracker,
    IStateDB
  ],
  activate: async (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    notebook_tracker: INotebookTracker,
    state: IStateDB
  ) => {
    // Create the Git model
    const apiGatewayExtension = new ApiGatewayExtension(
      notebook_tracker,
      state,
      EXTENSION_ID
    );
    await apiGatewayExtension.ready;

    // Create the API Gateway widget sidebar
    const apiGatewayPlugin = new ApiGatewayWidget(
      apiGatewayExtension
    );
    apiGatewayPlugin.id = 'jp-api-gateway';
    apiGatewayPlugin.title.icon = apiGatewayIcon;
    apiGatewayPlugin.title.caption = 'API Gateway';

    // Let the application restorer track the running panel for restoration of
    // application state (e.g. setting the running panel as the current side bar
    // widget).
    restorer.add(apiGatewayPlugin, 'api-gateway');

    // Rank has been chosen somewhat arbitrarily to give priority to the running
    // sessions widget in the sidebar.
    app.shell.add(apiGatewayPlugin, 'left', { rank: 200 });

    console.log('JupyterLab extension jupyterlab-api-gateway is activated!');
    return apiGatewayExtension;
  }
};

export default extension;
