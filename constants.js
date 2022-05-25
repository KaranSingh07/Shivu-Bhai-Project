/**
 * @author Karan Singh Solanki
 * Design and Developed by Karan Singh Solanki.
 * @copyright 2022 Karan Singh Solanki, inc. All rights reserved.
 * @email karansinghsolanki7410@gmail.com for any queries.
 * @warning Developed to fulfill specific requirements. Not to be used commercially.
 */

export const EXCEL = {
		PATH: 'test.xlsx',
		SHEET_NAME: 'Sheet1',
	},
	FIELDS_INCLUDED_IN_SEARCH = ['Address'],
	VILLAGE_LIST = 'village-list.txt',
	ERRORS = {
		FILE_NOT_FOUND_ERROR: `ERROR reading file at path specified. Make sure it exists and it have the correct extension: arg0`,
		SHEET_NOT_FOUND_ERROR: `ERROR reading sheet in the excel file specified. Make sure it exists: arg0`,
	};
