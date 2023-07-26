const path = require('path').join;
const loadDirectory = require('./loadDirectory');
const { Collection } = require('discord.js');

module.exports = async function() {
	const collection = new Collection();
	await loadDirectory(path(__dirname, 'discordInteractions'), file => {
		// コマンドを読み込む
		const command = require(file);
		if ('name' in command && 'data' in command && 'execute' in command) {
			// コレクションに登録する。
			collection.set(command.name, command);
		}
	}, {
		subdir: true,
		filetype: '.js',
	});
	return collection;
};