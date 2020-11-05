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
