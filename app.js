function getMonthLabel(year, month1To12) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return `${monthNames[month1To12 - 1]} ${year}`;
}
export function generateMonthGrid(year, month1To12, weekStart) {
    // return array of 42 'YYYY-MM-DD'
    const firstOfMonth = new Date(year, month1To12 - 1, 1);
    const gridStart = getStartOfWeek(firstOfMonth, weekStart);
    const cursor = new Date(gridStart);
    const grid = [];
    for (let i = 0; i < 42; i++) {
        grid.push(toIsoDate(cursor));
        cursor.setDate(cursor.getDate() + 1);
    }
    return grid;
}
function toIsoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function getStartOfWeek(d, weekStart) {
    const jsDay = d.getDay();
    const desiredStart = weekStart === "Sun" ? 0 : 1;
    const diff = (jsDay - desiredStart + 7) % 7;
    const copy = new Date(d);
    copy.setDate(copy.getDate() - diff);
    return copy;
}
function isDateInMonth(dateStr, year, month1To12) {
    const [y, m] = dateStr.split("-").map(Number);
    return y === year && m === month1To12;
}
function getWeekdayAbbrev(dateStr) {
    // Parse dateStr 'YYYY-MM-DD' into a Date object
    const parts = dateStr.split("-");
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    const date = new Date(y, m - 1, d);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()] ?? "Sun";
}
export function renderMonthGrid(year, month1To12, weekStart = "Mon", events = {}) {
    const dates = generateMonthGrid(year, month1To12, weekStart);
    let html = "";
    html += `<div class="calendar-header">${getMonthLabel(year, month1To12)}</div>\n`;
    // Weekday header above the grid
    const labelsSunFirst = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const labels = weekStart === "Sun"
        ? labelsSunFirst
        : [...labelsSunFirst.slice(1), labelsSunFirst[0]];
    html += '<div class="calendar-weekdays">\n';
    for (const label of labels) {
        html += `  <div class="weekday-cell">${label}</div>\n`;
    }
    html += "</div>\n";
    // 7x6 date grid
    html += '<div class="calendar-grid">\n';
    for (const date of dates) {
        const isOutsideMonth = !isDateInMonth(date, year, month1To12);
        const dayNumber = date.split("-")[2];
        const cellClass = isOutsideMonth
            ? "calendar-cell outside-month"
            : "calendar-cell";
        html += `  <div class="${cellClass}">\n`;
        html += `    <div class="cell-header">\n`;
        html += `      <span class="date">${dayNumber}</span>\n`;
        html += `    </div>\n`;
        html += `    <div class="chips">\n`;
        // Check if this date has events and display them
        if (events[date] && events[date].length > 0) {
            for (const eventName of events[date]) {
                html += `      <div class="chip">${eventName}</div>\n`;
            }
        }
        html += `    </div>\n`;
        html += `  </div>\n`;
    }
    html += "</div>";
    return html;
}
export function renderEvents(events) {
    let html = '<div class="events">\n';
    for (const event of events) {
        html += `  <div class="event">${event}</div>\n`;
    }
    html += "</div>";
    return html;
}
//# sourceMappingURL=app.js.map