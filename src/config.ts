const isDev = process.env.NODE_ENV === 'development';

const AUTH0_DOMAIN_NAME = 'dev-appoh.us.auth0.com';
const AUTH0_CLIENT_ID = 'ABMIS1L5cahVgkVlnyHrQR6imMTdVj4J';
const AUTH0_AUDIENCE = 'http://hola/api';
const SOCKET_URL = isDev ? 'http://localhost:5000' : 'https://hola-chat-server.herokuapp.com';

export { AUTH0_DOMAIN_NAME, AUTH0_CLIENT_ID, SOCKET_URL, AUTH0_AUDIENCE };
