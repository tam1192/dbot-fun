// eslint-disable-next-line no-unused-vars
const { SlashCommandBuilder, Interaction } = require('discord.js');
const fs = require('fs');

const name = 'settings';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('設定のテスト')
		.addBooleanOption(option => option.setName('a').setDescription('項目Aの可否')),
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		const replymsg = [];
		const Guild = interaction.guild;
		// 引数
		const a = interaction.options.getBoolean('a');

		// 引数無なら
		if (a == undefined) {
			replymsg.push(`**${Guild.name}の設定**`);
			replymsg.push(`- 項目A: ${Guild.settings.A}`);
		}
		// 引数有なら
		else {
			replymsg.push('**情報を保存しました。**');
			// ギルド設定を保存
			Guild.settings.A = a;
			fs.writeFileSync(Guild.settingsfile, JSON.stringify(Guild.settings), 'utf-8');
		}

		// 返信する
		interaction.reply(replymsg.join('\n'));
	},
};