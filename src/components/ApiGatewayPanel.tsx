import { showDialog } from '@jupyterlab/apputils';
import * as React from 'react';

import { ILanguageSelection, IApiGatewayExtension } from '../tokens';
import { LanguageSelectionForm } from '../widgets/LanguageSelectionForm';
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
  private _onSelectLanguage = async () => {
    const languages = this.props.model.languages;
    const currentLanguage = this.props.model.currentLanguage;
    const selection = await showDialog({
      title: 'Programming language selector',
      body: new LanguageSelectionForm(
        'Select programming language and variant for code generation',
        languages,
        currentLanguage
      )
    });

    if (selection.button.accept) {
      // User selected a language and variant
      const selected: ILanguageSelection = selection.value;
      this.props.model.currentLanguage = selected;
    }
  };
}
