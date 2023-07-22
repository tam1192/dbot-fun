'use strict';
const path = require('path');
const discordEvents = require('./modules/discordEvents');
const discordInteractions = require('./modules/discordInteractions');
const mkdir = require('./modules/mkdir');
const discordDeploy = require('./modules/discordDeploy');
const { Client, GatewayIntentBits } = require('discord.js');
const { Discord, defaultGuildSetting } = require('./config.json');

// クライアントインスタンスの作成
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Ctrl+Cでexitするようにする。
process.once('SIGINT', () => process.exit(0));
// exit
process.once('exit', () => {
	client.destroy();
	console.log('end');
});

// 設定ファイルの場所
const settingsPath = path.join(__dirname, 'settings');
// settings
client.settingsPath = mkdir(settingsPath);
// settings/guilds
mkdir(path.join(settingsPath, 'guilds'));
// settings/client
const clientPath = mkdir(path.join(settingsPath, 'client'));
// settings/client/command
const commandPath = mkdir(path.join(clientPath, 'command'));


// ギルドの初期設定
client.defaultGuildSetting = defaultGuildSetting;
// インタラクション情報登録
client.Interactions = discordInteractions();
// イベント登録
discordEvents(client);


// コマンド登録
async function main() {
	try {
		await discordDeploy(Discord.token, Discord.clientId, path.join(commandPath, `${Discord.clientId}.js`));
	}
	catch (error) {
		process.exit(1);
	}
	client.login(Discord.token);
}

main();