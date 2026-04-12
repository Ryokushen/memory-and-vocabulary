import { describe, expect, it } from "vitest";
import { diffDateKeys, toLocalDateKey } from "./date";

describe("date helpers", () => {
  it("formats calendar days in the requested timezone", () => {
    const timestamp = new Date("2026-04-12T00:30:00.000Z");

    expect(toLocalDateKey(timestamp, "UTC")).toBe("2026-04-12");
    expect(toLocalDateKey(timestamp, "America/Chicago")).toBe("2026-04-11");
  });

  it("counts date-key gaps by calendar day, including DST boundaries", () => {
    expect(diffDateKeys("2026-04-11", "2026-04-10")).toBe(1);
    expect(diffDateKeys("2026-03-09", "2026-03-08")).toBe(1);
    expect(diffDateKeys("2026-11-02", "2026-11-01")).toBe(1);
  });
});
