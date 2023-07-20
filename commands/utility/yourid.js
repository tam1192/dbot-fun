const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yourid')
		.setDescription('idを表示します。')
		.addUserOption(option => option.setName('target').setDescription('username'))
		.addBooleanOption(option => option.setName('public').setDescription('public?')),
	async execute(interaction) {
		const u = await interaction.options.getUser('target');
		const b = await interaction.options.getBoolean('public');
		console.log(b);
		await interaction.reply({
			content: `idは「${u.id}」`,
			ephemeral: (() => {
				if (b == null) {
					return false;
				}
				else {
					return !b;
				}
			})(),
		});
	},
};