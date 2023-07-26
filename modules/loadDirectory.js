const { readdir, statSync } = require('fs-extra');
const path = require('path').join;

/**
 * 非同期でディレクトリを走査し、ファイルを見つけます。
 * @param {String} dir 走査するディレクトリ
 * @param {Function} callback 見つけたとき
 * @param {{subdir: boolean, filetype: string}} options オプション
 */

module.exports = async function loadDirectory(dir, callback,
	__options = { subdir: true, filetype: '' }) {
	const options = {
		subdir: __options.subdir ?? true,
		filetype: __options.filetype ?? '',
	};
	/**
	 * @type {String[]} ディレクトリの内容
	 */
	const dirfiles = await readdir(dir);
	/**
	 * @type {Promise[]} Promiseを登録
	 */
	const promises = [];
	for (const file of dirfiles) {
		// ファイル名
		const filepath = path(dir, file);
		// ファイルの拡張子がfiletypeなら
		if (filepath.endsWith(options.filetype)) {
			// promisesに登録する。
			promises.push(callback(filepath));
		}
		else if (options.subdir) {
			// ディレクトリならば
			if (statSync(filepath).isDirectory()) {
				// 再帰関数
				// promisesに登録する。
				promises.push(loadDirectory(filepath, callback, options));
			}
		}
	}
	// 登録したすべてのpromiseを待つ
	await Promise.all(promises);
	// 終了したことを報告する。
	return 0;
};