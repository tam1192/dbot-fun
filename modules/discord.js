'use strict';
const discordEvents = require('./discordEvents');
const discordInteractions = require('./discordInteractions');
const { Client, GatewayIntentBits } = require('discord.js');
const { getVoiceConnections } = require('@discordjs/voice');
// const { generateDependencyReport } = require('@discordjs/voice');

// console.log(generateDependencyReport());

module.exports = async (config, settingsPath) => {
	// クライアントインスタンスの作成
	const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
	// 設定ファイルの場所を登録
	client.settingsPath = settingsPath;
	// ギルドの初期設定
	client.defaultGuildSetting = config.defaultGuildSetting;
	// インタラクション情報登録
	client.Interactions = discordInteractions();
	// イベント登録
	discordEvents(client);
	// exitシグナルでclientの接続を切るようにシグナル登録。
	process.once('exit', () => {
		client.destroy();
		const vcs = getVoiceConnections();
		if (vcs != undefined) {
			for (const vc of vcs) {
				vc[1].destroy();
			}
		}
	});
	// discordにログインする。
	await client.login(config.token);

	return client;
};
