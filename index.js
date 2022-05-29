/**
 * @author Karan Singh Solanki
 * Design and Developed by Karan Singh Solanki.
 * @copyright 2022 Karan Singh Solanki, inc. All rights reserved.
 * @email karansinghsolanki7410@gmail.com for any queries.
 * @warning Developed to fulfill specific requirements. Not to be used commercially.
 */

import { ExcelProcessor } from './ExcelProcessor.js';
import { EXCEL, FIELD_INCLUDED_IN_SEARCH, VILLAGE_LIST } from './constants.js';
import { getTextfileLines } from './utils.js';

var excelProcessor = new ExcelProcessor();

let results;
try {
	results = excelProcessor.getRowsBySearchTerms(
		excelProcessor.getWorksheetRows(EXCEL.PATH, EXCEL.SHEET_NAME),
		FIELD_INCLUDED_IN_SEARCH,
		getTextfileLines(VILLAGE_LIST)
	);
} catch {}

if (results) {
	excelProcessor.generateExcelFiles(results, './results');
}
