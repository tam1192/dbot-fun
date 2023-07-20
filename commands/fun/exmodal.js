const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modal')
		.setDescription('testmodal'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		// Add components to modal

		// Create the text input components
		const name = new TextInputBuilder()
			.setCustomId('yourname')
			// The label is the prompt the user sees for this input
			.setLabel('あんちゃんだあれ？')
			// Short means only a single line of text
			.setStyle(TextInputStyle.Short)
			.setValue('jon')
			.setRequired(true);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(name);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};