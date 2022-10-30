import { fireEvent, screen } from "@testing-library/react";

export const getInputByTextLabel = (labelName: RegExp) =>
  screen.findByLabelText(labelName);
export const changeInputValue = (element: HTMLElement, value: string) => {
  fireEvent.change(element, {
    target: {
      value,
    },
  });
};

export const clickOnText = async (buttonText: RegExp) => {
  const button = await screen.findByText(buttonText);
  fireEvent.click(button);
};
