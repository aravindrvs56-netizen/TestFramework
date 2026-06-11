export const config = {
  ui: {
    baseUrl: process.env.UI_BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    timeout: Number(process.env.UI_TIMEOUT) || 30000,
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    apiKey: process.env.REQRES_API_KEY || '',
    timeout: Number(process.env.API_TIMEOUT) || 15000,
  },
};
