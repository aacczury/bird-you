let fs = require('fs');
let linebot = require('linebot');
let express = require('express');

let messageParser = require('./messageParser.js');

let CONFIG_PATH = "./configs.js";

let checkChannelConfig = new Promise((resolve, reject) => {
    fs.stat(CONFIG_PATH, (err, stats) => {
        if(err || !stats.isFile()) {
            if(err) console.warn(err.message);
            else console.warn("is not file");
            resolve(null);
        } else {
           resolve(require(CONFIG_PATH));
        }
    })
})

checkChannelConfig.then((channelConfig) => {
    if(!channelConfig) {
        channelConfig = {
            "LINE_CHANNEL_ID": process.env.LINE_CHANNEL_ID || null,
            "LINE_CHANNEL_SECRET": process.env.LINE_CHANNEL_SECRET || null,
            "LINE_CHANNEL_ACCESS_TOKEN": process.env.LINE_CHANNEL_ACCESS_TOKEN || null
        }
    }

    if(!channelConfig.LINE_CHANNEL_ID ||
        !channelConfig.LINE_CHANNEL_SECRET ||
        !channelConfig.LINE_CHANNEL_ACCESS_TOKEN) {
            console.log(channelConfig);
            throw "Can't get line bot configs!"
        }

    let bot = linebot({
        "channelId": channelConfig.LINE_CHANNEL_ID,
        "channelSecret": channelConfig.LINE_CHANNEL_SECRET,
        "channelAccessToken": channelConfig.LINE_CHANNEL_ACCESS_TOKEN
    });

    let err, replyMessage;
    bot.on('message', function(event) {
        //console.log(event);
        if(event.message.type === "text") {
            ({err, replyMessage} = messageParser.parse(event.message.text));
            if(err) console.log(err.message);
            else {
                event.reply(replyMessage).then(function (data) {
                    console.log("set sucess");
                    console.log(data);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }
    });

    const app = express();
    const linebotParser = bot.parser();
    app.post('/', linebotParser);

    let server = app.listen(process.env.PORT || 8080, function() {
        let port = server.address().port;
        console.log("App now running on port", port);
    });
})