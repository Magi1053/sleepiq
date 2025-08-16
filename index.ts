import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'sleepiq/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Login using email and password to obtain an API key
   *
   * @summary Authenticate user
   */
  login(body: types.LoginBodyParam): Promise<FetchResponse<200, types.LoginResponse200> | FetchResponse<201, types.LoginResponse201>> {
    return this.core.fetch('/login', 'put', body);
  }

  /**
   * Retrieve JWT token for cookie-based authentication
   *
   * @summary Get JWT token
   */
  getJwt(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/jwt', 'get');
  }

  /**
   * Retrieve account details and bed information
   *
   * @summary Get account information
   */
  getAccount(): Promise<FetchResponse<200, types.GetAccountResponse200>> {
    return this.core.fetch('/account', 'get');
  }

  /**
   * Retrieve detailed information about a specific bed
   *
   * @summary Get bed information
   */
  getBed(metadata: types.GetBedMetadataParam): Promise<FetchResponse<200, types.GetBedResponse200>> {
    return this.core.fetch('/bed/{bedId}', 'get', metadata);
  }

  /**
   * Check if the bed is in pause mode
   *
   * @summary Get bed pause mode
   */
  getPauseMode(metadata: types.GetPauseModeMetadataParam): Promise<FetchResponse<200, types.GetPauseModeResponse200>> {
    return this.core.fetch('/bed/{bedId}/pauseMode', 'get', metadata);
  }

  /**
   * Enable or disable pause mode for the bed
   *
   * @summary Set bed pause mode
   */
  setPauseMode(body: types.SetPauseModeFormDataParam, metadata: types.SetPauseModeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/bed/{bedId}/pauseMode', 'put', body, metadata);
  }

  /**
   * Force the bed pump to idle state
   *
   * @summary Stop pump
   */
  stopPump(metadata: types.StopPumpMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/bed/{bedId}/pump/forceIdle', 'put', metadata);
  }

  /**
   * Set the sleep number for a specific side of the bed
   *
   * @summary Set sleep number
   */
  setSleepNumber(body: types.SetSleepNumberBodyParam, metadata: types.SetSleepNumberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/bed/{bedId}/sleepNumber', 'put', body, metadata);
  }

  /**
   * Retrieve the favorite sleep number for each side of the bed
   *
   * @summary Get favorite sleep number
   */
  getFavorite(metadata: types.GetFavoriteMetadataParam): Promise<FetchResponse<200, types.GetFavoriteResponse200>> {
    return this.core.fetch('/bed/{bedId}/sleepNumberFavorite', 'get', metadata);
  }

  /**
   * Set the favorite sleep number for a specific side of the bed
   *
   * @summary Set favorite sleep number
   */
  setFavorite(body: types.SetFavoriteBodyParam, metadata: types.SetFavoriteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/bed/{bedId}/sleepNumberFavorite', 'put', body, metadata);
  }

  /**
   * Retrieve the current status of the bed foundation including actuators and presets
   *
   * @summary Get foundation status
   */
  getFoundation(metadata: types.GetFoundationMetadataParam): Promise<FetchResponse<200, types.GetFoundationResponse200>> {
    return this.core.fetch('/bed/{bedId}/foundation/status', 'get', metadata);
  }

  /**
   * Check if a specific outlet exists and get its status
   *
   * @summary Check outlet status
   */
  checkOutlet(metadata: types.CheckOutletMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/bed/{bedId}/foundation/outlet', 'get', metadata);
  }

  /**
   * Retrieve the current foot warming settings for both sides of the bed
   *
   * @summary Get foot warming status
   */
  getFootWarming(metadata: types.GetFootWarmingMetadataParam): Promise<FetchResponse<200, types.GetFootWarmingResponse200>> {
    return this.core.fetch('/bed/{bedId}/foundation/footwarming', 'get', metadata);
  }

  /**
   * Calibrate or baseline the bed for a specific sleeper
   *
   * @summary Calibrate sleeper
   */
  calibrate(metadata: types.CalibrateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/sleeper/{sleeperId}/calibrate', 'put', metadata);
  }

  /**
   * Execute a BAM key command to control various bed features
   *
   * @summary Execute BAM key command
   */
  executeBam(body: types.ExecuteBamBodyParam, metadata: types.ExecuteBamMetadataParam): Promise<FetchResponse<200, types.ExecuteBamResponse200>> {
    return this.core.fetch('/sn/v1/accounts/{accountId}/beds/{bedId}/bamkey', 'put', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CalibrateMetadataParam, CheckOutletMetadataParam, ExecuteBamBodyParam, ExecuteBamMetadataParam, ExecuteBamResponse200, GetAccountResponse200, GetBedMetadataParam, GetBedResponse200, GetFavoriteMetadataParam, GetFavoriteResponse200, GetFootWarmingMetadataParam, GetFootWarmingResponse200, GetFoundationMetadataParam, GetFoundationResponse200, GetPauseModeMetadataParam, GetPauseModeResponse200, LoginBodyParam, LoginResponse200, LoginResponse201, SetFavoriteBodyParam, SetFavoriteMetadataParam, SetPauseModeFormDataParam, SetPauseModeMetadataParam, SetSleepNumberBodyParam, SetSleepNumberMetadataParam, StopPumpMetadataParam } from './types';
