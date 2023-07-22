const { REST, Routes, ContextMenuCommandBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const discordInteractions = require('./discordInteractions');


module.exports = async function(token, clientId, settingspath) {
	const interactions = discordInteractions();
	const body = [];
	const rest = new REST().setToken(token);

	for (const interaction of interactions) {
		const data = interaction[1].data;
		if (data instanceof ContextMenuCommandBuilder ||
		data instanceof SlashCommandBuilder) {
			body.push(data.toJSON());
		}
	}


	const data = JSON.stringify(body);
	if (fs.existsSync(settingspath)) {
		const cache = fs.readFileSync(settingspath, 'utf-8');
		if (cache == data) {
			return;
		}
	}

	try {
		console.log('コマンドが登録されていません。');
		console.log('コマンドを登録します。');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: body },
		);
	}
	catch (error) {
		console.error(error);
	}

	fs.writeFileSync(settingspath, data, 'utf-8');
};
