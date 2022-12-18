const CALENDAR_ID = "test@example.com";

function exportBillingHours() {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  console.log(calendar);
  const start = new Date("2022/04/01 00:00:00+0900");
  const end = new Date("2022/05/01 00:00:00+0900");

  const events = calendar.getEvents(start, end);
  const filtered = events.filter((e) => {
    return e.getTitle().startsWith("(");
  });

  if (filtered.length === 0) {
    return;
  }

  const records = filtered.map((event) => {
    const title = event.getTitle();
    const items = title.split(" ");

    return [items[1], items[0], event.getStartTime(), event.getEndTime()];
  });

  SpreadsheetApp.getActiveSheet()
    .getRange(2, 1, records.length, 4)
    .setValues(records);
}
