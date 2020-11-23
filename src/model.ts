import {
  showDialog,
  showErrorMessage,
  Dialog,
} from '@jupyterlab/apputils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { IStateDB } from '@jupyterlab/statedb';

import { ReadonlyJSONObject } from '@lumino/coreutils';
import { ISignal, Signal } from '@lumino/signaling';

import {
  IApiGatewayExtension,
  ILanguageSelection,
  IService,
  IEndpoint,
  ISettingsSelection,
  IAPIKey
} from './tokens';

// Load configuration
import config from './config';

// Postman SDK
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';

/**
 * Class for creating a model for code generation of gateway managed services
 */
export class ApiGatewayExtension implements IApiGatewayExtension {
  /**
   * Returns an extension model.
   *
   * @param notebook_tracker - notebook tracker to insert generated code
   * @returns extension model
   */
  constructor(
    notebookTracker: INotebookTracker,
    state: IStateDB,
    id: string,
  ) {
    this._state = state;
    this._id = id;
    this._readyPromise = this._getServices().then(() => this._recoverState());
    this._languages = this._getLanguages();
    this._currentLanguage = this.languages[0];
    this._APIKey = {value: ""};
    this._notebookTracker = notebookTracker;
  }

  /**
   * A signal emitted when the model state changes.
   */
  get stateChanged(): ISignal<ApiGatewayExtension, void> {
    return this._stateChanged;
  }

  /**
   * Language list for code generation.
   */
  get languages() {
    return this._languages;
  }

  /**
   * The current language to generate code.
   */
  get currentLanguage() {
    return this._currentLanguage;
  }

  /**
   * Setter for current language to generate code.
   */
  set currentLanguage(value: ILanguageSelection) {
    this._currentLanguage = value;
  }

  /**
   * User's API key to use in code generation.
   */
  get APIKey() {
    return this._APIKey;
  }

  /**
   * Setter for API key to use in code generation.
   */
  set APIKey(value: IAPIKey) {
    this._APIKey = value;
  }

  /**
   * Service list to generate code for.
   */
  get services() {
    return this._services;
  }

  /**
   * Boolean indicating whether the model has been disposed.
   */
  get isDisposed(): boolean {
    return this._isDisposed;
  }

  /**
   * Promise which fulfills when the model is ready.
   */
  get ready(): Promise<void> {
    return this._readyPromise;
  }

  /**
   * Insert code inside the active cell
   *
   * @param endpoint - endpoint to generate code against
   */
  insertCode = (endpoint: IEndpoint) => {
    var request = new sdk.Request(endpoint.host),
        language = this.currentLanguage.language,
        variant = this.currentLanguage.variant,
        options = {
          indentCount: 2,
          indentType: 'Space',
          trimRequestBody: true,
          followRedirect: true
        };

    const keyHeaderString = ({
      key: 'sandpit-key',
      value: this._APIKey.value,
    });
    const keyHeader = new sdk.Header(keyHeaderString);

    request.addHeader(keyHeader);

    codegen.convert(language, variant, request, options,
      (error: any, snippet: any) => {
        if (error) {
            console.log("error", error);
            showErrorMessage('Error generating code', error)
            return;
        }
        const current = this._notebookTracker.currentWidget;
        if (current === null){
          showDialog({
            title: 'Notebook not found',
            body: 'Create a notebook and select a cell to insert content to.',
            buttons: [Dialog.okButton({ label: 'Ok' })]
          });
          return;
        }
        const notebook = current.content;
        const activeCell = notebook.activeCell;
        activeCell.model.value.text = snippet;
      }
    );
  }

  /**
   * Update user selected settings
   *
   * @param settingsSelection - settings selected by the user
   */
  updateSettings = (settingsSelection: ISettingsSelection) => {
    this.currentLanguage = settingsSelection.language;
    this.APIKey = settingsSelection.APIKey;
    this._saveState();
    this._stateChanged.emit(void 0);
  };

  /**
   * Dispose of model resources.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._isDisposed = true;
    Signal.clearData(this);
  }

  /**
   * Make request for a list of languages for code generation
   *
   * @returns list of languages for code generation
   *
   */
  protected _getLanguages(): ILanguageSelection[] {
    const list: ILanguageSelection[] = [];

    const supportedCodegens = codegen.getLanguageList();
    supportedCodegens.forEach((language: any) => {
      language.variants.forEach((variant: any) => {
        const entry: ILanguageSelection = {
          language: language.key,
          label: language.label,
          variant: variant.key
        };
        list.push(entry);
      })
    })

    return list;
  }

  /**
   * Make request for a list of all services managed by the gateway
   *
   * @returns list of services managed by the gateway
   *
   */
  protected async _getServices(): Promise<void> {
    const url = new URL(config.ApiUrl);
    const response = await fetch( url.toString(), {} );
    const data = await response.json();
    this._services = data.apis;
    return Promise.resolve()
  }

  /**
   * Recover settings from saved states
   *
   */
  protected async _recoverState(): Promise<void> {
    this._state.fetch(this._id)
      .then(value => {
        if (value) {
          const serialisedLang = (value as ReadonlyJSONObject)['currentLanguage'] as string;
          const serialisedKey = (value as ReadonlyJSONObject)['APIKey'] as string;

          this._currentLanguage = <ILanguageSelection>JSON.parse(serialisedLang);
          this._APIKey = <IAPIKey>JSON.parse(serialisedKey);
        }
        Promise.resolve()
      })
      .catch(reason =>{
        console.error(`Something went wrong for extension ${this._id}.\n${reason}`);
        Promise.reject(reason)
      });
  }

  /**
   * Save settings in state object to be able to recover them on restore
   *
   */
  protected _saveState(): void {
    this._state.save(
        this._id,
        {
          currentLanguage: JSON.stringify(this._currentLanguage),
          APIKey: JSON.stringify(this._APIKey)
        }
    );
}

  private _state: IStateDB;
  private _id: string;
  private _notebookTracker: INotebookTracker;
  private _currentLanguage: ILanguageSelection;
  private _APIKey: IAPIKey;
  private _isDisposed = false;
  private _readyPromise: Promise<void>;
  private _services: IService[];
  private _languages: ILanguageSelection[];
  private _stateChanged = new Signal<ApiGatewayExtension, void>(this);
}
