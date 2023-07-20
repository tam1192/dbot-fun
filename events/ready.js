const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`【Discord】Login => ${client.user.tag}`);
	},
};