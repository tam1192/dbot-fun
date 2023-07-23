const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
/**
 * モーダルを表示する。
 */

const name = 'mymodal';

// 項目について
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
		// 項目を登録する。
		.addComponents(first),
	async execute(interaction) {
		// 項目を読み込む
		const yourname = interaction.fields.getTextInputValue('yourname');
		await interaction.reply({ content: `こんにちは、${yourname}` });
	},
};