import { CacheControl } from "./PrerenderedControl";
interface TrackItem {
    index: number;
    open: boolean;
    close: boolean;
    closing: boolean;
    position: 0;
}
interface CacheTrack {
    buffer: string;
    noCache: boolean;
    variables: Record<string, string>;
}
interface CacheLine {
    cache: {
        [key: string]: CacheTrack;
    };
    scopes: TrackItem[];
    stack: Array<string | number>;
    doNoCache: number;
    tail: string;
}
export declare const sequenceParser: (html: string, markers: Record<any, string>) => false | {
    key: string;
    blocks: string[];
    closing: boolean;
};
export declare const splitFirst: (str: string, needle: string) => string[];
export declare const nextIndexOf: (str: string, needles: string[], index: number) => number;
export declare const toTemplateVariables: (variables: string[]) => Record<string, string | boolean>;
export declare const restore: (variables: any, chunk: string, cache: CacheControl) => string;
export declare const process: (chunk: string, line: CacheLine, cache: CacheControl) => string;
export declare const cacheRenderedToString: (str: string, cache: CacheControl) => string;
export declare const createCacheStream: (cache: CacheControl) => any;
export {};
