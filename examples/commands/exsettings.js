const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
/**
 * 送信された情報を保存する。
 */

const name = 'settings';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('設定のテスト')
		.addBooleanOption(option => option.setName('a').setDescription('項目Aの可否')),
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
			// settingsはreadyイベントで初期値を登録(もしくは保存した情報をロード)
			// ready.jsの場所 => ./modules/discordEvents/ready.js
			// ギルド設定を保存
			Guild.settings.A = a;
			// 設定を上書きする。
			fs.writeFileSync(Guild.settingsfile, JSON.stringify(Guild.settings), 'utf-8');
			// 設定の保存は
			// 1.随時保存する
			// 2.特定時間でイベントを読み出し、保存する。
			// 時間になったら保存するようイベントを使う。
			// Node Schedule
			// 3.終了時保存する。
			// process.once('exit', ()=>{}); を使う。
		}

		// 返信する
		interaction.reply(replymsg.join('\n'));
	},
};