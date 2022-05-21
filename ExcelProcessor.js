import xlsx from 'xlsx';
import { ERRORS } from './constants.js';

export class ExcelProcessor {
	_fields = [];

	getWorksheetRows(path, sheetName) {
		let workBook;
		try {
			workBook = xlsx.readFile(path);
		} catch {
			console.log(ERRORS.FILE_NOT_FOUND_ERROR.replace('arg0', path));
			return;
		}

		const workSheet = workBook.Sheets[sheetName];
		if (workSheet) return xlsx.utils.sheet_to_json(workSheet);

		console.log(ERRORS.SHEET_NOT_FOUND_ERROR.replace('arg0', sheetName));
	}

	/**
	 * Returns map of string (filter) to array of rows matching the filter
	 * @param rows array of object as JSON
	 * @param fields array of strings to be used to find the search terms
	 * @param searchTerms array of strings to be searched. These will work as keys for the map
	 */
	getRowsBySearchTerms(rows, fields, searchTerms) {
		this._fields = fields;
		let rowsBySearchTerms = {};
		rows.forEach((row) => {
			searchTerms.forEach((searchTerm) => {
				if (this._matchFound(row, searchTerm)) {
					if (rowsBySearchTerms.hasOwnProperty(searchTerm)) {
						rowsBySearchTerms[searchTerm].push(row);
					} else {
						rowsBySearchTerms[searchTerm] = [row];
					}
				}
			});
		});

		return rowsBySearchTerms;
	}

	_matchFound(row, searchTerm) {
		return this._fields.some((field) =>
			row[field].toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
}
