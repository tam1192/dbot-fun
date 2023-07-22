'use strict';
const fs = require('fs-extra');
const path = require('path');
const loadDirectory = require('./modules/loadDirectory');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Discord, defaultGuildSetting } = require('./config.json');

function loadCollection(dir, collection) {
	loadDirectory(path.join(__dirname, dir), file => {
		// コマンドを読み込む
		const command = require(file);
		if ('name' in command && 'data' in command && 'execute' in command) {
			// コレクションに登録する。
			collection.set(command.name, command);
		}
	}, {
		subdir: true,
		filetype: '.js',
	});
}

function loadEvents(dir, c) {
	loadDirectory(path.join(__dirname, dir), file => {
		const event = require(file);
		if (event.once) {
			c.once(event.name, (...args) => event.execute(...args));
		}
		else {
			c.on(event.name, (...args) => event.execute(...args));
		}
	}, {
		subdir: false,
		filetype: '.js',
	});
}

// クライアントインスタンスの作成
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Ctrl+Cでexitするようにする。
process.once('SIGINT', () => process.exit(0));
// exit
process.once('exit', () => {
	client.destroy();
	console.log('end');
});

// 設定ファイル有無
const settingsPath = path.join(__dirname, 'settings');
const settingsDir = fs.existsSync(settingsPath);
// 設定ファイルがなければ
if (!settingsDir) {
	// 作成する
	fs.mkdirSync(settingsPath);
	fs.mkdirSync(path.join(settingsPath, 'guilds'));
}

// 設定ファイルの場所
client.settingsPath = path.join(__dirname, 'settings');
// コマンド
client.cmds = new Collection();
// // モーダル
// client.modals = new Collection();
// ギルドの初期設定
// client.defaultGuildSetting = defaultGuildSetting;

// loadCollection('commands', client.cmds);
loadCollection('modals', client.cmds);
loadEvents('events', client);


client.login(Discord.token);