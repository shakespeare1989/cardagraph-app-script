/**
 * Generates a user usage report for this day last week as a spreadsheet. The
 * report includes the date, user, last login time, number of emails received,
 * and number of drive files created.
 */
function generateUserUsageReport() {
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 3*28*24*60*1000);
  var timezone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(oneWeekAgo, timezone, "yyyy-MM-dd");

  var parameters = [
    "accounts:last_login_time",
    "gmail:num_emails_received",
    "drive:num_items_created",
  ];
  var rows = [];
  var pageToken;
  var page;
  var test = AdminReports.UserUsageReport.get("all", date)
  Logger.log(test)
  // var doc = DocumentApp.create("UsageReport")
  var body = DocumentApp.openById('').getBody().appendParagraph(`${test}`);
  do {
    page = AdminReports.UserUsageReport.get("all", date, {
      parameters: parameters.join(","),
      maxResults: 500,
      pageToken: pageToken,
    });
    if (page.warnings) {
      for (var i = 0; i < page.warnings.length; i++) {
        var warning = page.warnings[i];
        Logger.log(warning.message);
      }
    }
    var reports = page.usageReports;
    if (reports) {
      for (var i = 0; i < reports.length; i++) {
        var report = reports[i];
        var parameterValues = getParameterValues(report.parameters);
        var row = [
          report.date,
          report.entity.userEmail,
          parameterValues["accounts:last_login_time"],
          parameterValues["gmail:num_emails_received"],
          parameterValues["drive:num_items_created"],
        ];
        rows.push(row);
        Logger.log(row)
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create("G Suite User Usage Report");
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = [
      "Date",
      "User",
      "Last Login",
      "Num Emails Received",
      "Num Drive Files Created",
    ];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log("Report spreadsheet created: %s", spreadsheet.getUrl());
    Logger.log(report)
  } else {
    Logger.log("No results returned.");
  }
}
