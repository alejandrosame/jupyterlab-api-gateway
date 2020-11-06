import { showDialog } from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';

import { ILanguageSelection, IService } from '../tokens';
import { LanguageSelectionForm } from '../widgets/LanguageSelectionForm';
import { ServiceMenu } from './ServiceMenu';
import { Toolbar } from './Toolbar';

/**
 * Interface describing component properties.
 */
export interface IApiGatewayPanelProps {
  /**
   * Jupyter App commands registry
   */
  commands: CommandRegistry;

  /**
   * ApiGatewayPanel extension settings.
   */
  settings: ISettingRegistry.ISettings;

  /**
   * ApiGatewayPanel extension settings.
   */
  services: IService[];
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
        selectLanguage={this._onSelectLanguage}
      />
    );
  }

  /**
   * Renders the main panel.
   *
   * @returns React element
   */
  private _renderMain(): React.ReactElement {
    const services = this.props.services;
    return (
      <React.Fragment>
        {services.map((service, index) =>
          <ServiceMenu
            key={index}
            service={service}
            generateCode={(endpoint) => console.log("Generate code for", endpoint.name)}
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
  private _onSelectLanguage = async () => {
    const selection = await showDialog({
      title: 'Programming language selector',
      body: new LanguageSelectionForm(
        'Select programming language and variant for code generation',
        ['Python - default', 'Python - beautifulsoup'],
        'Python - default'
      )
    });

    if (selection.button.accept) {
      // User selected a language and variant
      const selected: ILanguageSelection = selection.value;
      console.log("Selected language '", selected.language, "' and variant '",
                  selected.variant, "'");
    } else {
      console.log("No language and variant selected")
    }
  };
}
