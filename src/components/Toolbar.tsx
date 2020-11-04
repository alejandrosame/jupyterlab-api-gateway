import * as React from 'react';
import { settingsIcon } from '../style/icons';
import {
  spacer,
  toolbarButtonClass,
  toolbarClass,
  toolbarNavClass
} from '../style/Toolbar';
import { ActionButton } from './ActionButton';

/**
 * Interface describing component properties.
 */
export interface IToolbarProps {
  /**
   * Callback to invoke in order to set language selection.
   *
   * @returns promise which selects a language
   */
  selectLanguage: () => Promise<void>;
}

/**
 * React component for rendering a panel toolbar.
 */
export class Toolbar extends React.Component<IToolbarProps> {
  /**
   * Returns a React component for rendering a panel toolbar.
   *
   * @param props - component properties
   * @returns React component
   */
  constructor(props: IToolbarProps) {
    super(props);
  }

  /**
   * Renders the component.
   *
   * @returns React element
   */
  render(): React.ReactElement {
    return (
      <div className={toolbarClass}>
        {this._renderTopNav()}
      </div>
    );
  }

  /**
   * Renders the top navigation.
   *
   * @returns React element
   */
  private _renderTopNav(): React.ReactElement {
    return (
      <div className={toolbarNavClass}>
        <span className={spacer} />
        <ActionButton
          className={toolbarButtonClass}
          icon={settingsIcon}
          onClick={this._onSettingsClick}
          title={'Select the language for code generation'}
        />
      </div>
    );
  }


  /**
   * Callback invoked upon clicking a button to select settings
   *
   * @param event - event object
   * @returns a promise which resolves settings selection
   */
  private _onSettingsClick = async (): Promise<void> => {
    try {
      console.log('Open settings');
      await this.props.selectLanguage();

    } catch (error) {
      console.error(error);
    }
  };
}
