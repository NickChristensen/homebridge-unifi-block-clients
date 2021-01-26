# Unifi Block Clients

***Note*: This plugin is no longer maintained. If you're interested in maintaining it, please open an issue.**

With this plugin, you can create switches that block/unblock network clients on your Unifi network. When a switch is toggled on, the client will be blocked from network access. When the switch is toggled off, the client will be allowed network access again.

Use it to automate network access for certain devices/users based on who's home, time of day, etc. Create scenes to group multiple devices together.

### Installation
`npm install -g homebridge-unifi-block-clients`

### Configuration
Add a new item to the `platforms` section of your `config.json` file, with the following items:

|Key|Default Value| Notes|
|---|---|---|
| `platform`       | | Needs to be set to `unifiBlockClients` to register this plugin |
| `name`           | | A name to help you identify this instance of this plugin |
| `username`       | | A user with access to your Unifi dashboard |
| `password`       | | |
| `controllerUrl`  | | The full url to your controller, including port number (usually `8443`) |
| `pollingFrequency` (optional) | `5000` | How often (in milliseconds) to check for updates to your device's blocked/unblocked state |
| `siteName` (optional)         | `default` | If you have a single site, it's called `default`.<br> If you have multiple sites, you can get the correct siteName by logging in to your Unifi dashboard, and checking the url for `/manage/site/SITENAME...` |
| `clients`         | `[]` | An array of strings, representing MAC addresses of network clients you'd like to control |

Example config.json:

```js
  "platforms": [
    {
      "platform": "unifiBlockClients",
      "name": "Unifi Block Clients",
      "username": "nickchristensen",
      "password": "good-long-password",
      "controllerUrl": "https://192.168.1.2:8443",
      "clients": [
        "00:00:00:00:00:00",
        ...
      ]
    }
  ]
```
