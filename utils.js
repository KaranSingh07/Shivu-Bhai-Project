import { readFileSync } from 'fs';
import { ERRORS } from './constants.js';

export function getTextfileLines(path) {
	try {
		return readFileSync(path, 'utf-8')
			.split(/\r?\n/)
			.filter((row) => row);
	} catch (error) {
		console.log(ERRORS.FILE_NOT_FOUND_ERROR.replace('arg0', path));
	}
}
