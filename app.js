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
export function renderMonthGrid(year, month1To12, weekStart = "Mon") {
    const dates = generateMonthGrid(year, month1To12, weekStart);
    let html = '<div class="calendar-grid">\n';
    for (const date of dates) {
        const isOutsideMonth = !isDateInMonth(date, year, month1To12);
        const dayNumber = date.split("-")[2];
        const weekday = getWeekdayAbbrev(date);
        const cellClass = isOutsideMonth
            ? "calendar-cell outside-month"
            : "calendar-cell";
        html += `  <div class="${cellClass}">\n`;
        html += `    <div class="cell-header">\n`;
        html += `      <span class="date">${dayNumber}</span>\n`;
        html += `    </div>\n`;
        html += `    <div class="chips"></div>\n`;
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