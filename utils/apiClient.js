import { request as playwrightRequest } from '@playwright/test';
import { config } from '../config/env.js';
import { logger } from './logger.js';

export class ApiClient {
  constructor(baseUrl = config.api.baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this._context = null;
  }

  async init() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (config.api.apiKey) {
      headers['x-api-key'] = config.api.apiKey;
    }

    this._context = await playwrightRequest.newContext({
      baseURL: this.baseUrl,
      timeout: config.api.timeout,
      extraHTTPHeaders: headers,
    });
    logger.info('API client initialized', { baseUrl: this.baseUrl });
    return this;
  }

  async dispose() {
    if (this._context) {
      await this._context.dispose();
      this._context = null;
    }
  }

  async get(endpoint, options = {}) {
    return this._request('GET', endpoint, options);
  }

  async post(endpoint, data = {}, options = {}) {
    return this._request('POST', endpoint, { ...options, data });
  }

  async put(endpoint, data = {}, options = {}) {
    return this._request('PUT', endpoint, { ...options, data });
  }

  async delete(endpoint, options = {}) {
    return this._request('DELETE', endpoint, options);
  }

  async _request(method, endpoint, options = {}) {
    if (!this._context) {
      await this.init();
    }

    const { data, headers, ...rest } = options;
    const requestOptions = {
      ...rest,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data !== undefined) {
      requestOptions.data = data;
    }

    logger.debug(`${method} ${endpoint}`, { data });

    let response;
    switch (method) {
      case 'GET':
        response = await this._context.get(endpoint, requestOptions);
        break;
      case 'POST':
        response = await this._context.post(endpoint, requestOptions);
        break;
      case 'PUT':
        response = await this._context.put(endpoint, requestOptions);
        break;
      case 'DELETE':
        response = await this._context.delete(endpoint, requestOptions);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    return {
      status: response.status(),
      ok: response.ok(),
      headers: response.headers(),
      body,
      raw: response,
    };
  }
}

export const createApiClient = () => new ApiClient();
