import * as React from 'react';
export interface PrerenderedCache {
    get(key: string): string | false | null;
    set(key: string, value: string, ttl: number): void;
}
export interface CacheControl {
    cache: PrerenderedCache;
    seed: string;
    get(key: number): string;
    set(key: number, value: string): void;
    store(key: string, value: string): void;
    assign(key: string, ttl: number): number;
}
interface PrerenderControls {
    isServer?: boolean;
    hydrated?: boolean;
    control?: CacheControl;
}
interface PrerenderState {
    hydrated?: boolean;
}
export declare const cacheControler: (cache: PrerenderedCache) => CacheControl;
export declare class PrerenderedControler extends React.Component<PrerenderControls, PrerenderState> {
    state: {
        hydrated: boolean;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare const PrerenderedContext: React.Context<PrerenderControls>;
export declare const PrerenderedControls: React.Consumer<PrerenderControls>;
interface TemplateControlState {
    variables: Record<string, string | number>;
    isServer: boolean;
    seed: string;
}
export declare const TemplateControl: React.Context<TemplateControlState>;
export {};
