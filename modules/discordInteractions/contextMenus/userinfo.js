const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

const name = 'userinfo';

module.exports = {
	name: name,
	data: new ContextMenuCommandBuilder()
		.setName(name)
		.setType(ApplicationCommandType.User),
	// eslint-disable-next-line no-unused-vars
	async execute(interaction) {
		await interaction.reply('test');
	},
};