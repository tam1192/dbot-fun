const { SlashCommandBuilder } = require('discord.js');
const { scheduleJob } = require('node-schedule');

// npm install node-schedule
// してください！

const name = 'schedule';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('スケジュール機能'),
	async execute(interaction) {
		await interaction.reply('定期的に反応するよ');
		const guild = interaction.guild;
		async function sc() {
			interaction.followUp('定期');
		}
		guild.settings.jobs = scheduleJob('*/20 * * * * *', sc);
	},
};