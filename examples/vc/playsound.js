const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('path');

const name = 'playsound';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('vcで音声を流します。')
		.addStringOption(option =>
			option.setName('choicesound')
				.setDescription('サウンドファイルを選択')
				.addChoices(
					{ name: 'エーデルワイス', value: 'sound1.wav' },
					{ name: '恋は水色', value: 'sound2.wav' },
				)
				.setRequired(true)),
	async execute(interaction) {
		const soundPath = interaction.client.soundPath;
		const guildId = interaction.guild.id;
		const soundname = await interaction.options.getString('choicesound');
		const vc = getVoiceConnection(guildId);
		if (vc != undefined) {
			const player = createAudioPlayer();
			const sound = createAudioResource(path.join(soundPath, soundname), { inlineVolume: true });
			sound.volume.setVolume(0.1);
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