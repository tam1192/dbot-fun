const { SlashCommandBuilder } = require('discord.js');

const name = 'yourid';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('idを表示します。')
		.addUserOption(option => option.setName('target').setDescription('username').setRequired(true))
		.addBooleanOption(option => option.setName('public').setDescription('public?')),
	async execute(interaction) {
		const u = await interaction.options.getUser('target');
		const b = await interaction.options.getBoolean('public');
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