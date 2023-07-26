const { exists, mkdir } = require('fs-extra');

/**
 * ディレクトリがなければ作成する。
 * @param {String} dirPath
 * @returns {Promise}
 */
module.exports = async (dirPath) => {
	// 設定ファイル有無
	const Dir = await exists(dirPath);
	// 設定ファイルがなければ
	if (!Dir) {
		// 作成する
		await mkdir(dirPath);
	}
	return dirPath;
};