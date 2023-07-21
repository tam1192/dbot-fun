// eslint-disable-next-line no-unused-vars
const { Events, Client, Interaction } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		/**
		 * @type {Client}
		 */
		const client = interaction.client;

		if (interaction.isChatInputCommand()) {
			const name = interaction.commandName;
			const command = client.cmds.get(name);
			if (!command) {
				console.error(`コマンドが見つかりません:${name}`);
			}
			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`コマンドが正常に動作しませんでした:${name}`);
				console.error(error);
			}
		}
		else if (interaction.isModalSubmit()) {
			const modals = client.modals;
			const modal = modals.get(interaction.customId);
			await modal.execute(interaction);
		}
		else {
			console.warn('解釈不明なインタラクションが送信されました。');
			return;
		}
	},
};