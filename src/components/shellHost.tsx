import * as React from "react";

import { IShellPage } from "./shellInterfaces";

export type ShellHostProps = {
  page: IShellPage;
};

const ShellHost = ({ page }: ShellHostProps) => {
  if (!page.component) {
    return null;
  }
  return React.createElement(page.component, page.componentProps || {});
};

export default ShellHost;
