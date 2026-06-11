export const ROUTES = {
  LOGIN: '/web/index.php/auth/login',
  DASHBOARD: '/web/index.php/dashboard/index',
};

export const PAGE_TITLES = {
  LOGIN: 'OrangeHRM',
  DASHBOARD: 'OrangeHRM',
};

export const MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  REQUIRED: 'Required',
};

export const API_ENDPOINTS = {
  USERS: '/users',
  USERS_BY_ID: (id) => `/users/${id}`,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNSUPPORTED_MEDIA: 415,
};
