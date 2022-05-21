import { ExcelProcessor } from './ExcelProcessor.js';
import { EXCEL, FIELDS_INCLUDED_IN_SEARCH, VILLAGE_LIST } from './constants.js';
import { getTextfileLines } from './utils.js';

var excelProcessor = new ExcelProcessor();

let results;
try {
	results = excelProcessor.getRowsBySearchTerms(
		excelProcessor.getWorksheetRows(EXCEL.PATH, EXCEL.SHEET_NAME),
		FIELDS_INCLUDED_IN_SEARCH,
		getTextfileLines(VILLAGE_LIST)
	);
} catch {}

if (results) {
	console.log(results);
}
