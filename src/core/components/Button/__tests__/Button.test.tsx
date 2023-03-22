import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("Renders an Anchor element if href prop is present", () => {
    render(<Button>Button</Button>);

    screen.getByRole("button");

    render(<Button href="/">Link</Button>);

    screen.getByRole("link");
  });

  it("Calls the callback function on click", () => {
    const callback = jest.fn();
    render(<Button onClick={callback}>Button</Button>);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(callback).toBeCalled();
  });
});
