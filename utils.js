/**
 * @author Karan Singh Solanki
 * Design and Developed by Karan Singh Solanki.
 * @email karansinghsolanki7410@gmail.com for any queries.
 * @warning Developed to fulfill specific requirements. Not to be used commercially.
 */

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
