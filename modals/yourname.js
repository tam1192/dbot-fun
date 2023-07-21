const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const name = 'mymodal';

const first = new ActionRowBuilder().addComponents(new TextInputBuilder()
	.setCustomId('yourname')
	.setLabel('あんちゃんだあれ？')
	.setStyle(TextInputStyle.Short)
	.setRequired(true));

module.exports = {
	name: name,
	data: new ModalBuilder()
		.setCustomId(name)
		.setTitle(name)
		.addComponents(first),
	async execute(interaction) {
		const yourname = interaction.fields.getTextInputValue('yourname');
		await interaction.reply({ content: `こんにちは、${yourname}` });
	},
};