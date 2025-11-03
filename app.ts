type WeekStart = "Sun" | "Mon";

export function generateMonthGrid(
  year: number,
  month1To12: number,
  weekStart: WeekStart
): string[] {
  // return array of 42 'YYYY-MM-DD'
  const firstOfMonth = new Date(year, month1To12 - 1, 1);
  const gridStart = getStartOfWeek(firstOfMonth, weekStart);
  const cursor = new Date(gridStart);
  const grid: string[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(toIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return grid;
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getStartOfWeek(d: Date, weekStart: WeekStart): Date {
  const jsDay = d.getDay();
  const desiredStart = weekStart === "Sun" ? 0 : 1;
  const diff = (jsDay - desiredStart + 7) % 7;
  const copy = new Date(d);
  copy.setDate(copy.getDate() - diff);
  return copy;
}

function isDateInMonth(
  dateStr: string,
  year: number,
  month1To12: number
): boolean {
  const [y, m] = dateStr.split("-").map(Number);
  return y === year && m === month1To12;
}

export function renderMonthGrid(
  year: number,
  month1To12: number,
  weekStart: WeekStart = "Mon"
): string {
  const dates = generateMonthGrid(year, month1To12, weekStart);
  let html = '<div class="calendar-grid">\n';

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
    html += `    <div class="chips"></div>\n`;
    html += `  </div>\n`;
  }

  html += "</div>";
  return html;
}

export function renderEvents(events: string[]): string {
  let html = '<div class="events">\n';
  for (const event of events) {
    html += `  <div class="event">${event}</div>\n`;
  }
  html += "</div>";
  return html;
}