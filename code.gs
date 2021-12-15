
function getRecentMessagesContent() {

    var threads = GmailApp.getInboxThreads(0,1);
    for (var i = 0; i < threads.length; i++)  {
      var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox.
      var message = thread.getMessages()[0];   
      var id = message.getId()
      var firstThread = GmailApp.getInboxThreads(0,1)[0];

      emailLogs = {
      "messageId": message.getId(),
      "messageHeader": message.getHeader("Message-ID"),
      "messageCount": thread.getMessageCount(),
      "messageDate": message.getDate(),
      "toEmailAddresses":  message.getTo(),
      "cEmailAddresses": message.getCc(),
      "bCEmailAddresses": message.getBcc(),
      "fromEmailAddress": message.getFrom(),
      "isInbox": message.isInInbox(),
      "isTrash": message.isInTrash(),
      "isRead": message.isUnread(),
      "lastMessageDate": firstThread.getLastMessageDate(),
        }
        
        // Logger.log(emailLogs)
    }

  // Get the history ID associated with the most recent
  // sent message.
  var sent = Gmail.Users.Threads.list('me', {
      q: 'label:sent',
      maxResults: 1
  });
  if (!sent.threads || !sent.threads[0]) {
    Logger.log('No sent threads found.');
    return;
  }
  var historyId = sent.threads[0].historyId;

  // Log the ID of each message changed since the most
  // recent message was sent.
  var pageToken;
  var changed = [];
  var message_id = '';
  do {
    var recordList = Gmail.Users.History.list('me', {
      startHistoryId: historyId,
      pageToken: pageToken
    });
    var history = recordList.history;
    if (history && history.length > 0) {
      history.forEach(function(record) {
        record.messages.forEach(function(message) {
          if (changed.indexOf(message.id) === -1) {
            changed.push(message.id);
            message_id = message.id;
            Logger.log(`Message Id: ${message_id}`)
            
          }
          var threads = GmailApp.getInboxThreads(0, 5);
            for (var i = 0; i < threads.length; i++) {
              var firstThread = GmailApp.getInboxThreads(0,1)[0];
              Logger.log(threads[i].getFirstMessageSubject());
              Logger.log(threads[i].getLastMessageDate())
              Logger.log(firstThread.getMessageCount())
              var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox
              var message = thread.getMessages()[0]; // Get first message
              var id = message.getId();
              var messageById = GmailApp.getMessageById(message_id);
              var firstThread = GmailApp.getInboxThreads(0,1)[0];
              var messages = firstThread.getMessages();
              Logger.log(message_id)
            }
        });
      });
      
    }
    pageToken = recordList.nextPageToken;
          } while (pageToken);

        changed.forEach(function(id) {
          Logger.log('Message Changed: %s', id);
        });

        var threads = GmailApp.getInboxThreads(0, 5);
          for (var i = 0; i < threads.length; i++) {
            var firstThread = GmailApp.getInboxThreads(0,1)[0];
            Logger.log(threads[i].getFirstMessageSubject());
            Logger.log(threads[i].getLastMessageDate())
            Logger.log(firstThread.getMessageCount())
            var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox
            var message = thread.getMessages()[0]; // Get first message
            var id = message.getId();
            var messageById = GmailApp.getMessageById(message_id);
            var firstThread = GmailApp.getInboxThreads(0,1)[0];
            var messages = firstThread.getMessages();
            Logger.log(message_id)
      }}
