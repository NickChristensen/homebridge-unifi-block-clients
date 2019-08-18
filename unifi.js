const axios = require('axios');
const https = require('https');

module.exports = class Unifi {
  constructor(args) {
    Object.entries(args).forEach(([key, val]) => (this[key] = val));
    this.connection = axios.create({
      baseURL: `${args.controllerUrl}/api/`,
      timeout: 5000,
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
  }

  authenticate = () => {
    return this.connection
      .post('login', {
        username: this.username,
        password: this.password,
        remember: true
      })
      .catch(err =>
        this.log(`Unable to authenticate with Unifi controller: "${err.message}"`)
      )
      .then(response => {
        if (!response) return;
        let cookies = response.headers['set-cookie']
          .map(cookie => cookie.split(';')[0])
          .join('; ');
        this.connection.defaults.headers.common['Cookie'] = cookies;
        return response;
      });
  };

  getKnownClients = () => {
    return this.connection
      .get(`/s/${this.siteName}/rest/user/`)
      .catch(err =>
        this.log(`Unable to get known clients: "${err.message}"`)
      );
  };

  blockClient = mac => {
    return this.connection
      .post(`/s/${this.siteName}/cmd/stamgr`, {
        mac,
        cmd: 'block-sta'
      })
      .then(response => response.data.data[0].blocked)
      .catch(err =>
        this.log(`Unable to block client: "${err.message}"`)
      );
  };

  unblockClient = mac => {
    return this.connection
      .post(`/s/${this.siteName}/cmd/stamgr`, {
        mac,
        cmd: 'unblock-sta'
      })
      .then(response => response.data.data[0].blocked)
      .catch(err =>
        this.log(`Unable to unblock client: "${err.message}"`)
      );
  };

  getClientBlockStatus = id => {
    return this.connection
      .get(`/s/${this.siteName}/rest/user/${id}`)
      .then(response => response.data.data[0].blocked)
      .catch(err =>
        this.log(`Unable to get client status: "${err.message}"`)
      );
  };
};
