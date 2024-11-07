function createEmailDraftsFromCalendar() {
  
  var draftCounter = 0;

  // Set the calendar
  var calendar = CalendarApp.getCalendarsByName('Mansi: Availability')[0];
  
  // Get today's date and the end date of the month
  var startTime = new Date();
  var endTime = new Date(startTime.getFullYear(), startTime.getMonth() + 1, 0);
  endTime.setHours(23, 59, 59, 999);

  // Fetch the calendar events between startTime and endTime
  var events = calendar.getEvents(startTime, endTime);
  
  // Loop through each event and create a draft email
  events.forEach(function(event) {

    var eventTitle = event.getTitle();
    var eventStartTime = event.getStartTime();
    var eventEndTime = event.getEndTime();
    var eventColor = event.getColor();
    
    if (eventColor !== '10' || (eventEndTime - eventStartTime) !== 60 * 60 * 1000) {
      return;
    }
    draftCounter += 1;

    // Date formatting
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var eventDateFormatted = eventStartTime.toLocaleDateString('en-US', options);

    // Create the email draft SUBJECT
    var subject = eventTitle.split(' ')[0] + ': ' + eventDateFormatted;

    // Create the email draft EMAILS
    var guests = event.getGuestList();
    var guestEmails = guests.map(function(guest) {
      return guest.getEmail();
    });
    var ccEmail = "fiona@deliberateu.com";

    var body;
    body = 'Hello\n\n\n\n' + 'Best regards,\n\nMansi';
    
    // Create the draft email with the list of emails as recipients
    GmailApp.createDraft(guestEmails.join(','), subject, body, { cc: ccEmail });
  });
  
  // Optionally, log the events created for debugging
  Logger.log('Drafts created for ' + draftCounter + ' events.');
}
