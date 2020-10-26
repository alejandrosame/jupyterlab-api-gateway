import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-api-gateway extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-api-gateway',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-api-gateway is activated!');
  }
};

export default extension;
