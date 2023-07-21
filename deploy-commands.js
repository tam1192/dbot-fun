const { REST, Routes } = require('discord.js');
const { Discord } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

/**
 * ディレクトリを走査し、ファイルを見つけます。
 * @param {String} dir 走査するディレクトリ
 * @param {Function} callback 見つけたとき
 * @param {{subdir: boolean, filetype: string}} options オプション
 */
function loadDirectory(dir, callback,
	options = { subdir: true, filetype: undefined }) {

	/**
	 * @type {String[]} ディレクトリの内容
	 */
	const dirfiles = fs.readdirSync(dir);
	for (const file of dirfiles) {
		// ファイル名
		const filepath = path.join(dir, file);
		// ファイルのstatを読み込み
		const filestat = fs.statSync(filepath);
		// ディレクトリならば
		if (options.subdir == true && filestat.isDirectory()) {
			// 再帰関数
			loadDirectory(filepath, callback);
		}
		else if (
			options.filetype == undefined ||
			filepath.endsWith(options.filetype)) {
			// コールバックする
			callback(filepath);
		}
	}
}

console.log('start');
const commands = [];
loadDirectory(path.join(__dirname, 'commands'), file => {
	const command = require(file);
	if ('name' in command && 'data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	}
}, {
	subdir: true,
	filetype: '.js',
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(Discord.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await (async () => {
			if (Discord.guildId == '') {
				return await rest.put(
					Routes.applicationCommands(Discord.clientId),
					{ body: commands },
				);
			}
			else {
				return await rest.put(
					Routes.applicationGuildCommands(Discord.clientId, Discord.guildId),
					{ body: commands },
				);
			}
		})();

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();