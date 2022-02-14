import React, { ComponentType, ReactElement } from "react";

export type HOC<T = any> = (Component: ComponentType<T>) => (props: T) => ReactElement<T>;

export const composeComponents = (...hocs: Array<HOC>) => (Component: any) => (props: any) => {
  return React.createElement(
    hocs.reduceRight((agg, next) => next(agg), Component),
    props
  )
}
