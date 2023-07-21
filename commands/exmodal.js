// eslint-disable-next-line no-unused-vars
const { SlashCommandBuilder, Interaction } = require('discord.js');

const name = 'modal';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('testmodal'),
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		const modals = interaction.client.modals;
		const modal = modals.get('mymodal');
		await interaction.showModal(modal.data);
	},
};