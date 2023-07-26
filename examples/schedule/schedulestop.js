const { SlashCommandBuilder } = require('discord.js');

const name = 'schedulestop';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('スケジュール機能の停止'),
	async execute(interaction) {
		await interaction.reply('じゃあ');
		const guild = interaction.guild;
		guild.settings.jobs.cancel();
	},
};