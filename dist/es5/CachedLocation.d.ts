import * as React from "react";
import { CacheControl } from "./PrerenderedControl";
export interface CachedLocationProps {
    cacheKey: string;
    refresh?: boolean;
    ttl?: number;
    noCache?: boolean;
    variables?: Record<string, string | number>;
}
export interface ServerCachedLocationProps extends CachedLocationProps {
    control: CacheControl;
}
export interface ClientCachedLocationProps extends CachedLocationProps {
    clientCache?: boolean;
    className?: string;
    rehydrate?: boolean;
    as?: string | React.ComponentType;
}
export interface ClientState {
    value: string | false | null;
    hydrated: boolean;
}
export declare const ServedCachedLocation: React.SFC<ServerCachedLocationProps>;
export declare class ClientCachedLocation extends React.Component<ClientCachedLocationProps & ServerCachedLocationProps, ClientState> {
    readonly state: Readonly<ClientState>;
    componentDidMount(): void;
    private onSetRef;
    render(): JSX.Element;
}
export declare const CachedLocation: React.SFC<CachedLocationProps | ClientCachedLocationProps>;
