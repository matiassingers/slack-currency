# slack-currency [![Build Status][travis-badge]][travis] [![Coverage Status][coveralls-badge]][coveralls]
> slack command for converting currency

![slack-currency screenshot example](screenshot-slack-reply.png)


## Running locally
```sh
$ git clone git@github.com:matiassingers/slack-currency.git && cd slack-currency
$ npm install
$ npm start
```

Your local copy should now be running at [`localhost:1337`](http://localhost:1337).

## Deploying to Heroku
```sh
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy with one click using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/matiassingers/slack-currency)

See the [Heroku documentation](https://devcenter.heroku.com/articles/config-vars) for more info about changing the configuration variables after deployment.

## Slack setup
1. Create a Slack [incoming WebHook][slack-webhook] integration *(settings aren't important, note the WebHook URL)*
2. Deploy your copy of `slack-currency`, and note your URL endpoint
3. Create a Slack [slash command][slack-command] integration with default settings and use the URL endpoint from above *(`/currency` is recommended, optionally note the token for extra security)*
4. *Optional: Add autocomplete help text to Slack command:*
  ![slack command autocomplete help](screenshot-slack-autocomplete.png)


## Settings
The following environment variables needs to be set for the command to work, if you use the Heroku Button above it'll ask for these automatically.

- `SLACK_HOOK_URL` - *Slack [incoming WebHook][slack-webhook] URL*
- `USERNAME` - *Username to use when replying with the conversion result (default: dorrars)*
- `EMOJI` - *Emoji icon to use when replying with the conversion result (default: :moneybag:)*
- `DEFAULT_CURRENCY` - *Default currency to convert to if no second currency is specified (default: DKK)*
- `SLACK_TOKEN` - *Additional security step: Slack [slash command][slack-command] token for verification that the request came from your Slack team (not required)*
- `OPENEXCHANGERATES_APP_ID` - *Specify a different key for openexchangerates.org in case the already provided key has been revoked (not required)*


## Related
- [`generator-slack-command`](https://github.com/matiassingers/generator-slack-command)
- [`slack-movie`](https://github.com/matiassingers/slack-movie)
- [`currency`](https://github.com/srn/currency)


## License

MIT © [Matias Singers](http://mts.io)

[slack-webhook]: https://my.slack.com/services/new/incoming-webhook/
[slack-command]: https://my.slack.com/services/new/slash-commands
[travis]: https://travis-ci.org/matiassingers/slack-currency
[travis-badge]: http://img.shields.io/travis/matiassingers/slack-currency.svg?style=flat-square
[coveralls]: https://coveralls.io/r/matiassingers/slack-currency
[coveralls-badge]: http://img.shields.io/coveralls/matiassingers/slack-currency.svg?style=flat-square
