# slack-currency [![Build Status](http://img.shields.io/travis/matiassingers/slack-currency.svg?style=flat-square)](https://travis-ci.org/matiassingers/slack-currency) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/slack-currency.svg?style=flat-square)](https://gemnasium.com/matiassingers/slack-currency)
> slack command for converting currency

![slack-currency screenshot example](screenshot.png)


## Running locally
```sh
$ git clone git@github.com:matiassingers/slack-currency.git && cd slack-currency
$ npm install
$ npm start
```


## Deploying to Heroku
```sh
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy with one click using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/matiassingers/slack-currency)


## Slack setup
1. Create a Slack [incoming WebHook](https://my.slack.com/services/new/incoming-webhook/) integration *(settings aren't important, note the WebHook URL and token)*
2. Create a Slack [slash command](https://my.slack.com/services/new/slash-commands) integration *(`/currency` is recommended)*


## Settings
The following environment variables needs to be set for the command to work, if you use the Heroku Button above it'll ask for these automatically.

- `SLACK_HOOK_URL` - *Slack [incoming WebHook](https://my.slack.com/services/new/incoming-webhook/) URL*
- `SLACK_TOKEN` - *Additional security step: Slack slash command token for verification that the request came from your Slack team (not required)*
- `USERNAME` - *Username to use when replying with the conversion result (default: dorrars)*
- `EMOJI` - *Emoji icon to use when replying with the conversion result (default: :moneybag:)*
- `DEFAULT_CURRENCY` - *Default currency to convert to if no second currency is specified*


## License

MIT © [Matias Singers](http://mts.io)
