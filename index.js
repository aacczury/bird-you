var linebot = require('linebot');
var express = require('express');
import {CHANNEL_ID, CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN} from "./config"

var bot = linebot({
	"channelId": CHANNEL_ID,
	"channelSecret": CHANNEL_SECRET,
	"channelAccessToken": CHANNEL_ACCESS_TOKEN
});