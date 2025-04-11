import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api-proxy', '');
  const url = `https://api.offlinetv.net${path}${event.rawQuery ? '?' + event.rawQuery : ''}`;

  const res = await fetch(url, {
    method: event.httpMethod,
    headers: {
      ...event.headers,
      host: 'api.offlinetv.net',
    },
    body: event.body,
  });

  const body = await res.text();

  return {
    statusCode: res.status,
    headers: {
      'content-type': res.headers.get('content-type') || 'application/json',
    },
    body,
  };
};

export { handler };
