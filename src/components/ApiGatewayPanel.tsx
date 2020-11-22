import { showDialog } from '@jupyterlab/apputils';
import * as React from 'react';

import { IApiGatewayExtension, ISettingsSelection } from '../tokens';
import { SettingsForm } from '../widgets/SettingsForm';
import { ServiceMenu } from './ServiceMenu';
import { Toolbar } from './Toolbar';

/**
 * Interface describing component properties.
 */
export interface IApiGatewayPanelProps {
  /**
   * APIGateway panel model.
   */
  model: IApiGatewayExtension;
}

/**
 * Interface describing component state.
 */
export interface IApiGatewayPanelState {
}

/**
 * React component for rendering a panel for aggregate API gateway operations.
 */
export class ApiGatewayPanel extends React.Component<
  IApiGatewayPanelProps,
  IApiGatewayPanelState
> {
  /**
   * Returns a React component for rendering a panel for aggregate API operations.
   *
   * @param props - component properties
   * @returns React component
   */
  constructor(props: IApiGatewayPanelProps) {
    super(props);
  }

  /**
   * Renders the component.
   *
   * @returns React element
   */
  render(): React.ReactElement {
    return (
      <div>
        <React.Fragment>
          {this._renderToolbar()}
          {this._renderMain()}
        </React.Fragment>
      </div>
    );
  }

  /**
   * Renders a toolbar.
   *
   * @returns React element
   */
  private _renderToolbar(): React.ReactElement {
    return (
      <Toolbar
        selectSettings={this._onSelectSettings}
      />
    );
  }

  /**
   * Renders the main panel.
   *
   * @returns React element
   */
  private _renderMain(): React.ReactElement {
    const services = this.props.model.services;
    const insertCodeFn = this.props.model.insertCode;
    return (
      <React.Fragment>
        {services.map((service, index) =>
          <ServiceMenu
            key={index}
            service={service}
            generateCode={(endpoint) => insertCodeFn(endpoint)}
          />
        )}
      </React.Fragment>
    );
  }

  /**
   * Callback invoked upon selecting a language
   *
   * @returns promise which selects a language
   */
  private _onSelectSettings = async () => {
    const languages = this.props.model.languages;
    const currentLanguage = this.props.model.currentLanguage;
    const key = this.props.model.APIKey;

    const selection = await showDialog({
      title: 'Settings',
      body: new SettingsForm(
        languages,
        currentLanguage,
        key
      )
    });

    if (selection.button.accept) {
      // Collect user input
      const selected: ISettingsSelection = selection.value;
      this.props.model.updateSettings(selected);
    }
  };
}
