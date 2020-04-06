import * as React from 'react';
export interface ComponentProps {
    wrapperTag?: string;
    restore?: (element: HTMLElement, store?: any) => Promise<any> | any;
    store?: any;
    live: boolean | Promise<any>;
    strict?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export interface ComponentState {
    live: boolean;
    state: any;
}
export interface WrapperProps {
    wrapperTag?: string;
    id: string;
    className?: string;
    style?: React.CSSProperties;
    live: boolean;
    strict: boolean;
    dehydrate: (element: HTMLElement) => void;
}
export declare class PrerenderedComponent extends React.Component<ComponentProps, ComponentState> {
    state: ComponentState;
    awaitingFor: any;
    static getDerivedStateFromProps(props: ComponentProps, state: ComponentState): {
        live: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    checkLive(): void;
    awaitForLive(live: Promise<any>): void;
    dehydrate: (el: HTMLElement) => void;
    render(): JSX.Element;
}
