import { EnhancedStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export default function renderWithProviders(
  ui: JSX.Element,
  store: EnhancedStore
) {
  return render(<Provider store={store}>{ui}</Provider>);
}
