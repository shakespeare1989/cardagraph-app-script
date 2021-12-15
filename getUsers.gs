function listAllUsers() {
  today = new Date();
  var pageToken;
  var page;
  do {
    page = AdminDirectory.Users.list({
      domain: "",
      orderBy: "givenName",
      maxResults: 100,
      pageToken: pageToken,
    });
    var users = page.users;
    if (users) {
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        Logger.log("%s (%s)", user.name.fullName, user.primaryEmail);
        DocumentApp.openById('').getBody().appendParagraph(`${today} ${user}`);

        
      }
      getUser();
      getRecentMessagesContent();
    } else {
      Logger.log("No users found.");
      DocumentApp.openById('').getBody().appendParagraph(`${today} Error`);

    }
    pageToken = page.nextPageToken;
  } while (pageToken);


  function getUser() {
    var userEmail = "";
    var user = AdminDirectory.Users.get(userEmail);
    var today = new Date()
    DocumentApp.create(`${userEmail}`).getBody().appendParagraph(`${today}${user}`);

    Logger.log("User data:\n %s", JSON.stringify(user, null, 2));
  }
}
