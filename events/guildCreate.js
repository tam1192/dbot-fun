const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
	once: true,
	execute(guild) {
		console.log(`ギルドに参加しました。: ${guild.name}`);
	},
};