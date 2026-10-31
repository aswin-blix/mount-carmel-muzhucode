import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TcLookup } from "@/components/TcLookup";

const certificates = [
  { tcNumber: "MC/2026/014", studentName: "Anitha R", lastClass: "Class 10", issuedOn: "2026-05-20" },
  { tcNumber: "MC/2026/015", studentName: "Joel S", lastClass: "Class 12", issuedOn: "2026-05-28" },
];

afterEach(cleanup);

describe("TcLookup", () => {
  it("lists every certificate by default", () => {
    render(<TcLookup certificates={certificates} />);
    expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2
    expect(screen.getByText("2 certificates shown")).toBeTruthy();
    expect(screen.getByText("20 May 2026")).toBeTruthy();
  });

  it("filters by TC number or name, ignoring case", () => {
    render(<TcLookup certificates={certificates} />);
    const input = screen.getByLabelText(/Search by TC number/);
    fireEvent.change(input, { target: { value: "015" } });
    expect(screen.getByText("1 certificate shown")).toBeTruthy();
    expect(screen.getByText("Joel S")).toBeTruthy();
    fireEvent.change(input, { target: { value: "anitha" } });
    expect(screen.getByText("Anitha R")).toBeTruthy();
    expect(screen.queryByText("Joel S")).toBeNull();
  });

  it("shows zero results for an unknown number", () => {
    render(<TcLookup certificates={certificates} />);
    fireEvent.change(screen.getByLabelText(/Search by TC number/), { target: { value: "999" } });
    expect(screen.getByText("0 certificates shown")).toBeTruthy();
    expect(screen.getByText(/No certificate matches “999”/)).toBeTruthy();
  });
});
