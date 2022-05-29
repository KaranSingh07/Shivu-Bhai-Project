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

let excelPath, sheetName, villageList;

getInputs();
let results;

try {
	results = excelProcessor.getRowsBySearchTerms(
		excelProcessor.getWorksheetRows(excelPath, sheetName),
		FIELD_INCLUDED_IN_SEARCH,
		getTextfileLines(villageList)
	);
} catch {}

if (results) {
	excelProcessor.generateExcelFiles(results, './results');
}

function getInputs() {
	console.log(INTRO);
	const prompt = promptSync({ sigint: true });

	excelPath = prompt('Name of the excel file: ');
	sheetName = prompt('Name of the sheet of the excel file: ');
	villageList = prompt('Name of the village list file: ');
}
