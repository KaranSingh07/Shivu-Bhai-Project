/**
 * @author Karan Singh Solanki
 * Design and Developed by Karan Singh Solanki.
 * @email karansinghsolanki7410@gmail.com for any queries.
 * @warning Developed to fulfill specific requirements. Not to be used commercially.
 */

import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { ERRORS } from './constants.js';
import cliProgress from 'cli-progress';

export class ExcelProcessor {
	// _fields = [];

	getWorksheetRows(path, sheetName) {
		let workBook;
		console.log('Reading excel file');
		const bar = new cliProgress.SingleBar(
			{},
			cliProgress.Presets.shades_classic
		);
		bar.start(100, 0);

		try {
			workBook = xlsx.readFile(path);
			bar.stop();
		} catch {
			bar.stop();
			console.log(ERRORS.FILE_NOT_FOUND_ERROR.replace('arg0', path));
			return;
		}

		const workSheet = workBook.Sheets[sheetName];
		if (workSheet) {
			bar.update(100);
			bar.stop();
			return xlsx.utils.sheet_to_json(workSheet);
		}

		bar.stop();
		console.log(ERRORS.SHEET_NOT_FOUND_ERROR.replace('arg0', sheetName));
	}

	/**
	 * Returns map of string (filter) to array of rows matching the filter
	 * @param rows array of object as JSON
	 * @param fields array of strings to be used to find the search terms
	 * @param searchTerms array of strings to be searched. These will work as keys for the map
	 */
	getRowsBySearchTerms(rows, field, searchTerms) {
		//this._fields = fields;
		let rowsBySearchTerms = {};
		const NO_MATCH = 'Z_NO_MATCH';
		const ROW_COUNT = rows.length;

		let rowsWithNoMatch = [];

		console.log('Processing excel along with villages...');

		const bar = new cliProgress.SingleBar(
			{},
			cliProgress.Presets.shades_classic
		);
		bar.start(ROW_COUNT, 0);

		let currentRow = 1;
		rows.forEach((row) => {
			let matchFound = false;
			searchTerms.forEach((searchTerm) => {
				if (
					this._matchFound(
						row[field].toString(),
						searchTerm.toString()
					)
				) {
					matchFound = true;
					if (rowsBySearchTerms.hasOwnProperty(searchTerm)) {
						rowsBySearchTerms[searchTerm].push(row);
					} else {
						rowsBySearchTerms[searchTerm] = [row];
					}
				}
			});
			if (!matchFound) rowsWithNoMatch.push(row);
			// bar.update(Math.round((currentRow * 100) / ROW_COUNT));
			bar.update(currentRow);
			currentRow++;
		});

		rowsBySearchTerms[NO_MATCH] = [...rowsWithNoMatch];

		bar.stop();
		return rowsBySearchTerms;
	}

	_matchFound(row, searchTerm) {
		const SPACE = ' ';
		const COMMA = ',';
		const HYPHEN = '-';
		const PERIOD = '.';

		searchTerm = searchTerm.toLowerCase().trim();
		row =
			row
				.toLowerCase()
				.trim()
				.replaceAll(HYPHEN, SPACE)
				.replaceAll(PERIOD, SPACE) + SPACE;

		let searchTerms = [
			SPACE + searchTerm + SPACE,
			SPACE + searchTerm + COMMA,
			COMMA + searchTerm + SPACE,
			COMMA + searchTerm + COMMA,
		];

		return searchTerms.some((searchTerm) => {
			return row.includes(searchTerm);
		});
	}

	generateExcelFiles(data, outputFolder) {
		console.log('Generating results...');
		const villageCount = Object.keys(data).length;
		const bar = new cliProgress.SingleBar(
			{},
			cliProgress.Presets.shades_classic
		);
		bar.start(villageCount, 0);

		const columns = Object.keys(data[Object.keys(data)[0]][0]);

		if (fs.existsSync(outputFolder)) {
			this.removeDir(outputFolder);
		}
		fs.mkdir(outputFolder, () => {});

		let count = 1;
		Object.keys(data).forEach((village) => {
			let rowsForOneVillage = data[village].map((cell) => {
				let row = [];
				columns.forEach((column) => {
					row.push(cell[column]);
				});
				return row;
			});

			const workBook = xlsx.utils.book_new();
			const workSheetData = [columns, ...rowsForOneVillage];
			const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
			xlsx.utils.book_append_sheet(workBook, workSheet, village);
			xlsx.writeFile(
				workBook,
				path.resolve(outputFolder + '/' + village + '.xlsx')
			);
			bar.update(Math.round(count));
			count++;
		});
		bar.stop();
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
