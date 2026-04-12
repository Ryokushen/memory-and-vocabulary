function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

type DateParts = {
  year: number;
  month: number;
  day: number;
};

function parseDateKey(dateKey: string): DateParts {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid date key: ${dateKey}`);
  }

  return { year, month, day };
}

export function toLocalDateKey(
  date: Date = new Date(),
  timeZone?: string,
): string {
  if (!timeZone) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to format local date key.");
  }

  return `${year}-${month}-${day}`;
}

export function diffDateKeys(laterDateKey: string, earlierDateKey: string): number {
  const later = parseDateKey(laterDateKey);
  const earlier = parseDateKey(earlierDateKey);
  const laterUtc = Date.UTC(later.year, later.month - 1, later.day);
  const earlierUtc = Date.UTC(earlier.year, earlier.month - 1, earlier.day);

  return Math.round((laterUtc - earlierUtc) / (1000 * 60 * 60 * 24));
}
