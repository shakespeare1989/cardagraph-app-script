function listAllGroups() {
    var pageToken;
    var page;
    do {
      page = AdminDirectory.Groups.list({
        domain: "",
        maxResults: 100,
        pageToken: pageToken,
      });
      var groups = page.groups;
      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          Logger.log("%s (%s)", group.name, group.email);
          DocumentApp.openById('').getBody().appendParagraph(`${today} ${group.name}`);

        }
      } else {
        Logger.log("No groups found.");
        DocumentApp.openById('').getBody().appendParagraph(`${today} No Groups Found`);

      }
      pageToken = page.nextPageToken;
    } while (pageToken);

     function getGroupSettings() {
    var groupId = "";
    var group = AdminGroupsSettings.Groups.get(groupId);
    Logger.log(JSON.stringify(group, null, 2));
}
  }
