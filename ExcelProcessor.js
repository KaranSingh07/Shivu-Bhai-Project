import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
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
		const SPACE = ' ';
		const COMMA = ',';
		const HYPHEN = '-';

		searchTerm = searchTerm.toLowerCase();

		let searchTerms = [SPACE + searchTerm.trim() + SPACE];

		let result = false;
		this._fields.forEach((field) => {
			let value = row[field]
				.toLowerCase()
				.replace(COMMA, SPACE)
				.replace(HYPHEN, SPACE);
			+SPACE;
			searchTerms.forEach((searchTerm) => {
				if (value.includes(searchTerm)) {
					result = true;
				}
			});
		});

		return result;
	}

	generateExcelFiles(data, outputFolder) {
		const columns = Object.keys(data[Object.keys(data)[0]][0]);

		if (fs.existsSync(outputFolder)) {
			this.removeDir(outputFolder);
		}
		fs.mkdir(outputFolder, () => {});

		Object.keys(data).forEach((village) => {
			let rowsForOneVillage = data[village].map((cell) => {
				let row = [];
				columns.forEach((column) => {
					row.push(cell[column]);
				});
				return row;
			});

			// try {
			const workBook = xlsx.utils.book_new();
			const workSheetData = [columns, ...rowsForOneVillage];
			const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
			xlsx.utils.book_append_sheet(workBook, workSheet, village);
			xlsx.writeFile(
				workBook,
				path.resolve(outputFolder + '/' + village + '.xlsx')
			);
		});
	}

	removeDir(path) {
		if (fs.existsSync(path)) {
			const files = fs.readdirSync(path);

			if (files.length > 0) {
				files.forEach(function (filename) {
					if (fs.statSync(path + '/' + filename).isDirectory()) {
						removeDir(path + '/' + filename);
					} else {
						fs.unlinkSync(path + '/' + filename);
					}
				});
				fs.rmdirSync(path);
			} else {
				fs.rmdirSync(path);
			}
		} else {
			console.log('Directory path not found.');
		}
	}
}
