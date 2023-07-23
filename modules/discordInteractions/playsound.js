const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('path');

const name = 'playsound';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('vcで音声を流します。'),
	async execute(interaction) {
		const settingsPath = interaction.client.settingsPath;
		const guildId = interaction.guild.id;
		const vc = getVoiceConnection(guildId);
		if (vc != undefined) {
			const player = createAudioPlayer();
			const sound = createAudioResource(path.join(settingsPath, 'testsound.wav'));
			player.play(sound);
			vc.subscribe(player);
			await interaction.reply({
				content: '再生します。',
			});
		}
		else {
			await interaction.reply({
				content: 'vcに参加していません。',
			});
		}
	},
};