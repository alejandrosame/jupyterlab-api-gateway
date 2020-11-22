import { Token } from '@lumino/coreutils';
import { IDisposable } from '@lumino/disposable';
import { ISignal } from '@lumino/signaling';

export const EXTENSION_ID = 'jupyter.extensions.api_gateway_plugin';
export const IApiGatewayExtension = new Token<IApiGatewayExtension>(EXTENSION_ID);

/** Interface for extension class */
export interface IApiGatewayExtension extends IDisposable {
  /**
   * A signal emitted when the model state changes.
   */
  readonly stateChanged: ISignal<IApiGatewayExtension, void>;

  /**
   * Language list for code generation.
   */
  languages: ILanguageSelection[];

  /**
   * The current language to generate code for.
   */
  currentLanguage: ILanguageSelection;

  /**
   * User's API key to use in code generation.
   */
  APIKey: IAPIKey;

  /**
   * Service list to generate code for.
   */
  services: IService[];

  /**
   * Insert code inside the active cell
   *
   * @param endpoint - endpoint to generate code against
   */
  insertCode: (endpoint: IEndpoint) => void;

  /**
   * Update user selected settings
   *
   * @param settingsSelection - settings selected by the user
   */
  updateSettings: (settingsSelection: ISettingsSelection) => void;

  /**
   * A promise that fulfills when the model is ready;
   * i.e. if the top folder repository has been found.
   */
  ready: Promise<void>;
}

/**
 * Endpoint description interface
 */
export interface IService {
  name: string;
  description: string;
  thumbnail: string;
  endpoints: IEndpoint[];
}

/**
 * Endpoint description interface
 */
export interface IEndpoint {
  name: string;
  description: string;
  host: string;
}


export interface ILanguageSelection {
  /**
   * Programming language
   */
  language: string;

  /**
   * Print representation of programming language
   */
  label: string;

  /**
   * Code generation variant
   */
  variant: string;
}


export interface IAPIKey {
  /**
   * Value of the API key
   */
  value: string;
}


export interface ISettingsSelection {
  /**
   * API key used to generate code
   */
  APIKey: IAPIKey;

  /**
   * Language to generate code against
   */
  language: ILanguageSelection
}
