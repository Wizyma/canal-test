import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class Fetcher {
  public static instance: Fetcher;

  #instance: AxiosInstance;
  #language = 'en-GB';
  #apiKey = process.env?.API_KEY;
  #baseURL = 'https://api.themoviedb.org/3';
  #languages: {
    fr: 'fr-FR';
    en: 'en-GB';
    us: 'en-US';
    de: 'de';
  };

  constructor() {
    this.#instance = axios.create({
      baseURL: this.#baseURL,
    });
  }

  /**
   * Get fetcher instance
   * Can be usefull if we implement some methods to change the language on the fly
   * on the client side
   *
   * @static
   * @returns
   * @memberof Fetcher
   */
  public static getInstance() {
    if (!Fetcher.instance) {
      Fetcher.instance = new Fetcher();
    }

    return Fetcher.instance;
  }

  public updateLanguage(lang: 'fr' | 'en' | 'us' | 'de') {
    if (!Fetcher.instance) {
      throw new Error(`Fetcher must be instanciated`);
    }

    this.#language = this.#languages[lang];
  }

  public async getAsync<T, E = unknown>(
    urlOptions: { path: string; params?: string },
    options?: Omit<AxiosRequestConfig, 'baseURL' | 'url'>,
  ): Promise<AxiosResponse<T> | AxiosError<E>> {
    const { path, params } = urlOptions;
    try {
      if (!path) {
        throw new Error('An path must be passed to the getAsync method');
      }

      const url = `${path}?api_key=${this.#apiKey}&language=${this.#language}&${params ?? ''}`;

      const response: AxiosResponse<T> = await this.#instance.request<T>({
        ...options,
        method: 'GET',
        url,
      });

      return response;
    } catch (err) {
      const error = err as AxiosError<E>;
      return error;
    }
  }
}

export default Fetcher;
