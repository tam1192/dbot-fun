const { SlashCommandBuilder } = require('discord.js');
/**
 * モーダルを呼び出すコマンド
 */

const name = 'modal';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('testmodal'),
	async execute(interaction) {
		const client = interaction.client;
		const modal = client.Interactions.get('mymodal');
		// モーダルを呼び出す。
		await interaction.showModal(modal.data);
	},
};