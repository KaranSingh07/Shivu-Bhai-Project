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
	FIELD_INCLUDED_IN_SEARCH = ['Address'],
	VILLAGE_LIST = 'village-list.txt',
	ERRORS = {
		FILE_NOT_FOUND_ERROR: `ERROR reading file at path specified. Make sure it exists and it have the correct extension: arg0`,
		SHEET_NOT_FOUND_ERROR: `ERROR reading sheet in the excel file specified. Make sure it exists: arg0`,
	},
	INTRO = `
* * * * * * * * * * *
*
* @author Karan Singh Solanki
* Design and Developed by Karan Singh Solanki.
* @email karansinghsolanki7410@gmail.com for any queries.
* @warning Developed to fulfill specific requirements and can be used as per the instructions below.
*
*
* Instructions:
* * * * * * * * * * *
*
* 1. Create a new folder and place this application into it.
* 2. Place your excel file and village list file also in the folder.
* 3. You have to provide following three things when asked:
*	  a. Name of the excel file (including extension). For example: students.xlsx.
*		 It should exactly match the filename.
*	  b. Name of the sheet to be used. For example: Sheet1
*		 It should exactly match the filename.
*	  c. Name of the file containing village list (including extension). For example: villages.txt. 
*  		 It should have village names one on each line. Ignore the upper/lower case, we will handle it.
* 4. Hit enter and we will process the data for you. There will be a results folder created with your excel files per village.
*	 We will create one excel file for each village. Name of that file will be the village name itself. 
*	 One file will also be there containing the data that doesn't match with any of the village name.
*	 We named this file 'Z_NO_MATCH' so that you can find it easily in the end.
*
* * * * * * * * * * *
`;
