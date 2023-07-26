const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const name = 'joinvc';

module.exports = {
	name: name,
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription('vcに参加します.'),
	async execute(interaction) {
		const channelId = interaction.member.voice.channelId;
		const channelname = interaction.member.voice.channel.name;
		const guildId = interaction.guild.id;
		const voiceAdapterCreator = interaction.guild.voiceAdapterCreator;
		await interaction.reply({
			content: 'vcに参加します。',
		});
		joinVoiceChannel({
			channelId: channelId,
			guildId: guildId,
			adapterCreator: voiceAdapterCreator,
			selfDeaf: true,
		});
		await interaction.editReply(`参加しました：${channelname}`);
	},
};