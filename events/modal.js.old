const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId === 'myModal') {
			const name = interaction.fields.getTextInputValue('yourname');
			await interaction.reply({ content: `こんにちは、${name}` });
		}
	},
};