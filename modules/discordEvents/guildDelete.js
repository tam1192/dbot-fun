const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildDelete,
	once: true,
	execute(guild) {
		console.log(`ギルドから退出しました。: ${guild.name}`);
	},
};