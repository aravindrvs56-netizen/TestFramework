import { test } from '@playwright/test';

export const attachApiExchange = async (label, request, response) => {
  await test.info().attach(`${label} - Request`, {
    body: JSON.stringify(request, null, 2),
    contentType: 'application/json',
  });

  await test.info().attach(`${label} - Response`, {
    body: JSON.stringify(
      {
        status: response.status,
        body: response.body,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });
};
