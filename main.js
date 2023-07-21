'use strict';

const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Discord } = require('./config.json');

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

function loadCollection(dir, collection) {
	loadDirectory(path.join(__dirname, dir), file => {
		const command = require(file);
		if ('name' in command && 'data' in command && 'execute' in command) {
			collection.set(command.name, command);
		}
		// else {
		// 	console.warn(`${file}はコマンドではありません！`);
		// }
	}, {
		subdir: true,
		filetype: '.js',
	});
}

function loadEvents(dir, c) {
	loadDirectory(path.join(__dirname, dir), file => {
		const event = require(file);
		if (event.once) {
			c.once(event.name, (...args) => event.execute(...args));
		}
		else {
			c.on(event.name, (...args) => event.execute(...args));
		}
	}, {
		subdir: false,
		filetype: '.js',
	});
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cmds = new Collection();
client.modals = new Collection();

loadCollection('commands', client.cmds);
loadCollection('modals', client.modals);
loadEvents('events', client);


client.login(Discord.token);