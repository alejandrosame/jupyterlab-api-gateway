import { ISignal, Signal } from '@lumino/signaling';
import { INotebookTracker } from '@jupyterlab/notebook';

import { IApiGatewayExtension, ILanguageSelection, IService } from './tokens';

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
   * @param nnotebook_tracker - notebook tracker to insert generated code
   * @returns extension model
   */
  constructor(
    notebook_tracker: INotebookTracker
  ) {
    this._readyPromise = this._getServices();
    this._notebook_tracker = notebook_tracker;

    console.log(this._notebook_tracker);

    var request = new sdk.Request('https://www.google.com'),
        language = 'nodejs',
        variant = 'request',
        options = {
          indentCount: 3,
          indentType: 'Space',
          trimRequestBody: true,
          followRedirect: true
        };
    codegen.convert(language, variant, request, options, function(error: any, snippet: any) {
      if (error) {
          console.log("error", error);
      }
      console.log("snippet", snippet);
    });
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
   * A signal emitted when the user has changed the selected language.
   */
  get languageChanged(): ISignal<IApiGatewayExtension, void> {
    return this._languageChanged;
  }

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
    return [];
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

  private _notebook_tracker: INotebookTracker;
  private _currentLanguage: ILanguageSelection;
  private _isDisposed = false;
  private _readyPromise: Promise<void>;
  private _services: IService[];
  private _languages: ILanguageSelection[];
  private _languageChanged = new Signal<IApiGatewayExtension, void>(this);
}
