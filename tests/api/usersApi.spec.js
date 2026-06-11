import { test, expect } from '@playwright/test';
import { users } from '../../test-data/index.js';
import { createApiClient } from '../../utils/apiClient.js';
import { attachApiExchange } from '../../utils/allureHelper.js';
import { API_ENDPOINTS, HTTP_STATUS } from '../../utils/constants.js';

test.describe('Users API', () => {
  let apiClient;

  test.beforeEach(async () => {
    apiClient = createApiClient();
    await apiClient.init();
  });

  test.afterEach(async () => {
    await apiClient.dispose();
  });

  test('GET /users - retrieve user list @api @smoke', async () => {
    const endpoint = API_ENDPOINTS.USERS;

    const response = await apiClient.get(endpoint);
    await attachApiExchange('GET Users', { method: 'GET', endpoint }, response);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const firstUser = response.body[0];
    expect(firstUser).toHaveProperty('id');
    expect(typeof firstUser.id).toBe('number');
    expect(firstUser).toHaveProperty('name');
    expect(typeof firstUser.name).toBe('string');
    expect(firstUser).toHaveProperty('username');
    expect(typeof firstUser.username).toBe('string');
    expect(firstUser).toHaveProperty('email');
    expect(typeof firstUser.email).toBe('string');
    expect(firstUser).toHaveProperty('address');
    expect(typeof firstUser.address).toBe('object');
  });

  test('POST /users - create user with valid payload @api @positive', async () => {
    const payload = users.api.validCreateUser;
    const endpoint = API_ENDPOINTS.USERS;

    const response = await apiClient.post(endpoint, payload);
    await attachApiExchange('POST Create User', { method: 'POST', endpoint, payload }, response);

    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.body).toHaveProperty('name', payload.name);
    expect(response.body).toHaveProperty('email', payload.email);
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('number');
  });

  test('POST /users - negative creation with missing required email field @api @negative', async () => {
    const payload = users.api.invalidCreateUser;
    const endpoint = API_ENDPOINTS.USERS;

    const response = await apiClient.post(endpoint, payload);
    await attachApiExchange('POST Invalid User', { method: 'POST', endpoint, payload }, response);

    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.body).toHaveProperty('name', payload.name);
    expect(response.body.email).toBeUndefined();
    expect(response.body).not.toHaveProperty('username');
  });
});
