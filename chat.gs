function chats() {
  var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox
  var message = thread.getMessages()[0]; // Get first message
  Logger.log("is a chat? " + message.isInChats());

  var threads = GmailApp.getChatThreads();
  Logger.log("# of chat threads: " + threads.length);

  // Get first 50 chat threads
  var threads = GmailApp.getChatThreads(0,50);
  // Will log no more than 50.0
  Logger.log(threads.length);
}
