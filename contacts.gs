function generateLoginActivityReport() {
  var now = new Date();
  // var today = now.getUTCDate();
  var oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var startTime = oneWeekAgo.toISOString();
  var endTime = now.toISOString();
  sheetId = ''

  var rows = [];
  var pageToken;
  var page;
  do {
    page = AdminReports.Activities.list("all", "login", {
      startTime: startTime,
      endTime: endTime,
      maxResults: 500,
      pageToken: pageToken,
    });
    var items = page.items;
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var row = [
          new Date(),
          item.actor.email,
          item.events[0].name,
        ];
        rows.push(row);
        Logger.log(row)
    
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create("G Suite Login Report");
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ["Time", "User", "Login Result"];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log("Report spreadsheet created: %s", sheetId=spreadsheet.getId());
    generateUserUsageReport();
  } else {
    Logger.log("No results returned.");
  }
}
// [END apps_script_admin_sdk_generate_login_activity_report]
