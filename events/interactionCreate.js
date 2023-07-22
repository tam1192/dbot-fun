// eslint-disable-next-line no-unused-vars
const { Events, Client, Interaction } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		/**
		 * @type {Client}
		 */
		const client = interaction.client;
		const cmds = client.cmds;

		if (interaction.isChatInputCommand()) {
			const name = interaction.commandName;
			const command = cmds.get(name);
			// const command = client.cmds.get(name);
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
			const name = interaction.customId;
			const modal = cmds.get(name);
			// const modals = client.modals;
			// const modal = modals.get(interaction.customId);
			await modal.execute(interaction);
		}
		else {
			console.warn('解釈不明なインタラクションが送信されました。');
			return;
		}
	},
};