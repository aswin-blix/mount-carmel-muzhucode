import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Faq } from "@/components/Faq";

const items = [
  { q: "First question?", a: "First answer." },
  { q: "Second question?", a: "Second answer." },
];

afterEach(cleanup);

describe("Faq", () => {
  it("opens the first answer by default", () => {
    render(<Faq items={items} />);
    expect(screen.getByRole("button", { name: /First question/ }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("First answer.")).toBeTruthy();
    expect(screen.queryByText("Second answer.")).toBeNull();
  });

  it("switches to another answer when its question is clicked", () => {
    render(<Faq items={items} />);
    fireEvent.click(screen.getByRole("button", { name: /Second question/ }));
    expect(screen.getByRole("button", { name: /Second question/ }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("button", { name: /First question/ }).getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByText("Second answer.")).toBeTruthy();
  });

  it("links each button to its panel", () => {
    render(<Faq items={items} />);
    const btn = screen.getByRole("button", { name: /First question/ });
    const panel = screen.getByRole("region");
    expect(btn.getAttribute("aria-controls")).toBe(panel.id);
  });
});
