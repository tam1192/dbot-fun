// eslint-disable-next-line no-unused-vars
const { Events, Client, Collection } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		/**
		 * @type {Client}
		 */
		const client = interaction.client;
		/**
		 * @type {Collection}
		 */
		const cmds = client.cmds;

		if (!interaction.isChatInputCommand()) return;

		const command = cmds.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};