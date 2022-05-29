/**
 * @author Karan Singh Solanki
 * Design and Developed by Karan Singh Solanki.
 * @email karansinghsolanki7410@gmail.com for any queries.
 * @warning Developed to fulfill specific requirements. Not to be used commercially.
 */

import { ExcelProcessor } from './ExcelProcessor.js';
import {
	EXCEL,
	FIELD_INCLUDED_IN_SEARCH,
	VILLAGE_LIST,
	INTRO,
} from './constants.js';
import { getTextfileLines } from './utils.js';
import promptSync from 'prompt-sync';

var excelProcessor = new ExcelProcessor();

let excelPath, sheetName, villageListPath;

getInputs();
let results;

try {
	let rows = excelProcessor.getWorksheetRows(excelPath, sheetName);
	let villageList = getTextfileLines(villageListPath);
	results = excelProcessor.getRowsBySearchTerms(
		rows,
		FIELD_INCLUDED_IN_SEARCH,
		villageList
	);
} catch {
	console.log(
		'Make sure there are no open excel files. If so, close them first'
	);
}

if (results) {
	excelProcessor.generateExcelFiles(results, './results');
}

function getInputs() {
	console.log(INTRO);
	const prompt = promptSync({ sigint: true });

	console.log('Please provide following details:');
	excelPath = prompt('Excel file name: ');
	sheetName = prompt('Sheet name: ');
	villageListPath = prompt('Village list file name: ');
}
