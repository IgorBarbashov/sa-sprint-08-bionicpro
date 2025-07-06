const express = require('express');
const session = require('express-session');
const cors = require('cors');
const Keycloak = require('keycloak-connect');
require('dotenv').config();

const PORT = process.env.PORT;
const USAGE_REPORT_ROLE = 'prothetic_user';

const app = express();

app.use(cors());

const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'prothetic_user_api_key',
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM
};
const keycloak = new Keycloak({store: memoryStore}, keycloakConfig);
app.use(keycloak.middleware());

app.get(
  '/reports',
  keycloak.protect(`realm:${USAGE_REPORT_ROLE}`),
  (req, res) => {
    res.json({message: 'Reports data'});
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
