const { SlashCommandBuilder } = require('discord.js');
/**
 * コマンド（と引数）の例
 */

// コマンド名
const name = 'yourid';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		// 説明
		.setDescription('idを表示します。')
		/**
		 * 引数を設定する
		 */
		.addSubcommand(subcommand =>
			subcommand
				.setName('sub1')
				.setDescription('サブコマンド1')
				// setRequiredで強制化する。
				.addBooleanOption(option => option.setName('boolean').setDescription('boolean型で選択').setRequired(true))
				.addStringOption(option =>
					option.setName('string')
						.setDescription('文字列のリストで選択')
						.addChoices(
							{ name: 'value1', value: '項目１' },
							{ name: 'value2', value: '項目２' },
						),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('sub2')
				.setDescription('サブコマンド2')
				.addUserOption(option => option.setName('user').setDescription('ユーザー名を選択'))
				.addChannelOption(option => option.setName('channel').setDescription('チャンネル名を選択')),
		),
	async execute(interaction) {
		// 引数を読み込む
		const b = await interaction.options.getBoolean('boolean');
		const s = await interaction.options.getString('string');
		const u = await interaction.options.getUser('user');
		const c = await interaction.options.getChannel('channel');
		const msg = [];
		let private;
		msg.push = '結果は...';
		if (b == undefined, s == undefined) {
			msg.push = `booleanは${u}、stringは${c}`;
			private = false;
		}
		else if (u == undefined, c == undefined) {
			msg.push = `booleanは${b}、stringは${s}`;
			private = false;
		}
		else {
			msg.push = '引数がありませんよ';
			private = true;
		}
		await interaction.reply({
			// join('\n')は、配列を'\n'(改行)をはさんで連結します。
			content: msg.join('\n'),
			// コマンド実行者にのみ表示しますか?
			ephemeral: private,
		});
	},
};