import { Children, ReactNode } from "react";

export const Each = ({
  render,
  of,
}: {
  render: (item: any, i: number) => ReactNode;
  of: any[];
}) => Children.toArray(of.map((item, index) => render(item, index)));
