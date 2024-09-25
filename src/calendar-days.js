function CalendarDays(props) {
  const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  // Helper function to format dates as yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Loop to generate the days
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  // Divide days into rows of 7
  const rows = [];
  for (let i = 0; i < currentDays.length; i += 7) {
    rows.push(currentDays.slice(i, i + 7));
  }

  return (
    <>
      {rows.map((week, rowIndex) => (
        <tr key={rowIndex}>
          {week.map((day, index) => {
            // Check if the current day matches a day in the JSON data
            const formattedDate = formatDate(day.date);
            const events = props.events.filter((event) => event.date === formattedDate); // Get all events for the current day

            return (
              <td
                key={index}
                className={
                  "calendar-day" +
                  (day.currentMonth ? " current" : "") +
                  (day.selected ? " selected" : "")
                }
                onClick={() => props.changeCurrentDay(day)}
              >
                <p className="dayNumber">{day.number}</p>
                {events.length > 0 &&
                  events.map((event, eventIndex) => (
                    <p key={eventIndex} className="eventName">
                      {event.name}
                    </p>
                  ))}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default CalendarDays;
