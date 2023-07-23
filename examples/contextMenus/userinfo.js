const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
/**
 * ユーザーに対するコンテキストメニューの例
 */

const name = 'userinfo';

module.exports = {
	name: name,
	data: new ContextMenuCommandBuilder()
		.setName(name)
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		const user = interaction.targetUser;
		await interaction.reply(`${user}が呼び出されました。`);
	},
};