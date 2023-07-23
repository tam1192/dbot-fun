const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
/**
 * ユーザーに対するコンテキストメニューの例
 */

const name = 'messageinfo';

module.exports = {
	name: name,
	data: new ContextMenuCommandBuilder()
		.setName(name)
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		const msg = interaction.targetMessage;
		await interaction.reply(`${msg}を呼び出しました。`);
	},
};