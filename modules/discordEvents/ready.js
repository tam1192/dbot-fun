// eslint-disable-next-line no-unused-vars
const { Events, Client } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: Events.ClientReady,
	once: true,
	/**
	 * @param {Client} client
	 */
	async execute(client) {
		const guilds = client.guilds;
		const defaultGuildSetting = client.defaultGuildSetting;
		const settingsPath = client.settingsPath;
		const guildsPath = path.join(settingsPath, 'guilds');

		for (const g of guilds.cache) {
			const guildid = g[0];
			const Guild = g[1];
			const guildfile = path.join(guildsPath, `${guildid}.js`);

			// 設定を読み込む
			if (fs.existsSync(guildfile)) {
				Guild.settings = JSON.parse(fs.readFileSync(guildfile, 'utf-8'));
			}
			// 設定ファイルを作成
			else {
				fs.writeFileSync(guildfile, JSON.stringify(defaultGuildSetting), 'utf-8');
				Guild.settings = defaultGuildSetting;
			}

			Guild.settingsfile = guildfile;
		}

		console.log(`【Discord】Login => ${client.user.tag}`);
	},
};