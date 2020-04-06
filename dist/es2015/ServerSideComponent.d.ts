import * as React from "react";
export interface ComponentProps {
    className?: string;
    style?: React.CSSProperties;
}
export declare const ServerSideComponent: React.SFC<ComponentProps>;
export declare function serverSideComponent<K, T extends React.ComponentType<K>>(Component: T): T;
