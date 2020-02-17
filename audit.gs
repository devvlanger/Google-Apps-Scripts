     function onEdit() {
  // This script records changes to the spreadsheet on a "Changelog" sheet.
  // The changelog includes these columns:
  // "timestamp", "sheet", "cell", "new value", "user"
  // Users are logged by email address.
  // The script will require each user's authorization to run.
  // See https://productforums.google.com/d/topic/docs/az365_ypIV0/discussion
  
  var changelogSheetName = "audit" // sheet where the changelog is stored
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var cell = SpreadsheetApp.getActiveRange();
  var timestamp = new Date();
  var currentSheet = ss.getActiveSheet();
  var currentSheetName = currentSheet.getName(); 
  // if it is the changelog sheet that is being edited, do not record the change to avoid recursion
  if (currentSheetName == changelogSheetName) return;

  var changelogSheet = ss.getSheetByName(changelogSheetName);
  if (changelogSheet == null) {
    // no changelog sheet found, create it as the last sheet in the spreadsheet
    changelogSheet = ss.insertSheet(changelogSheetName, ss.getNumSheets());
    Utilities.sleep(2000); // give time for the new sheet to render before going back
    ss.setActiveSheet(currentSheet);
    changelogSheet.appendRow(["timestamp", "sheet", "cell", "new value", "user"]);
    changelogSheet.setFrozenRows(1);
  }
  var user = Session.getEffectiveUser().getEmail();
  changelogSheet.appendRow([timestamp, currentSheetName, cell.getA1Notation(), cell.getValue(), user]);
}

