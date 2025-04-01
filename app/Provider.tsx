import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

interface Props {
  children: any;
}

export const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
