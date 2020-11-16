import { Token } from '@lumino/coreutils';
import { IDisposable } from '@lumino/disposable';
import { ISignal } from '@lumino/signaling';

export const EXTENSION_ID = 'jupyter.extensions.api_gateway_plugin';
export const IApiGatewayExtension = new Token<IApiGatewayExtension>(EXTENSION_ID);

/** Interface for extension class */
export interface IApiGatewayExtension extends IDisposable {
  /**
   * Language list for code generation.
   */
  languages: ILanguageSelection[];

  /**
   * The current language to generate code.
   */
  currentLanguage: ILanguageSelection;

  /**
   * Service list to generate code for.
   */
  services: IService[];


  /**
   * A signal emitted when the user has changed the selected language.
   */
  readonly languageChanged: ISignal<IApiGatewayExtension, void>;

  /**
   * Insert code inside the active cell
   *
   * @param endpoint - endpoint to generate code against
   */
  insertCode: (endpoint: IEndpoint) => void;

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
   * Code generation variant
   */
  variant: string;
}
