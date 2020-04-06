import * as React from "react";
export declare const Placeholder: React.SFC<{
    name: string;
}>;
declare type RenderChildren = (arg: (name: string) => string) => React.ReactNode;
export declare const WithPlaceholder: React.SFC<{
    children: RenderChildren;
}>;
export {};
