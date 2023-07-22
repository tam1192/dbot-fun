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
		const b = interaction.options.getBoolean('a');
		const Guild = interaction.guild;
		const replymsg = [];

		if (b == undefined) {
			replymsg.push(`**${Guild.name}の設定**`);
			replymsg.push(`- 項目A: ${Guild.settings.A}`);
		}
		else {
			replymsg.push('**情報を保存しました。**');
			Guild.settings.A = b;
			fs.writeFileSync(Guild.settingsfile, JSON.stringify(Guild.settings), 'utf-8');
		}
		interaction.reply(replymsg.join('\n'));
	},
};