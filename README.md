# statsbot

_protocol independent chat statistics bot made with [coffea](https://github.com/caffeinery/coffea)_

[![https://i.imgur.com/szdgjf9.png](https://i.imgur.com/szdgjf9.png)](https://telegram.me/nationalsecurityagency_bot)

Available as [nationalsecurityagency_bot](https://telegram.me/nationalsecurityagency_bot) on [telegram](https://telegram.org/).

## What do the emoji mean?

 * :speech_balloon: - messages (includes commands)
 * :thought_balloon: - commands (messages that start with `/`)
 * :rainbow: - stickers
 * :mount_fuji: - photos
 * :sound: - audio/speech
 * :movie_camera: - videos

## Setup

```
git clone https://github.com/coffea-bots/stats
cd stats
npm install
```

### Example: Telegram

Create `config.json` with the connection data:

```
[
  {
    "protocol": "telegram",
    "token": "PUT_TELEGRAM_TOKEN_FROM_BOTFATHER_HERE"
  }
]
```

Then install `coffea-telegram`:

```
npm install coffea-telegram
```


## Running

Use this for production use:

```
npm start
```

During development, you can also use:

```
npm run start:dev
```

To enable debug messages and run the code with on-the-fly compilation
(via `babel-node`).

Or you can use:

```
npm run watch
```

To automatically restart the bot when the code changes.
