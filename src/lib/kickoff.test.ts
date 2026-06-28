import { describe, it, expect } from "vitest";
import { nextKickoff, formatCountdown } from "./kickoff";

describe("nextKickoff", () => {
  it("returns a date with time 12:15:00", () => {
    const d = nextKickoff(new Date("2026-06-28T09:00:00"));
    expect(d.getHours()).toBe(12);
    expect(d.getMinutes()).toBe(15);
    expect(d.getSeconds()).toBe(0);
  });

  it("returns today if it's before 12:15", () => {
    const now = new Date("2026-06-28T11:00:00");
    const d = nextKickoff(now);
    expect(d.toDateString()).toBe(now.toDateString());
  });

  it("returns the next day if it's after 12:15", () => {
    const now = new Date("2026-06-28T13:00:00");
    const d = nextKickoff(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(d.toDateString()).toBe(tomorrow.toDateString());
  });

  it("returns the next day if it's exactly 12:15", () => {
    const now = new Date("2026-06-28T12:15:00");
    const d = nextKickoff(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(d.toDateString()).toBe(tomorrow.toDateString());
  });
});

describe("formatCountdown", () => {
  it("formats remaining seconds into HH:MM:SS", () => {
    expect(formatCountdown(3661)).toBe("01:01:01");
    expect(formatCountdown(0)).toBe("00:00:00");
    expect(formatCountdown(3599)).toBe("00:59:59");
  });

  it("handles more than 24h correctly", () => {
    expect(formatCountdown(90000)).toBe("25:00:00");
  });
});
