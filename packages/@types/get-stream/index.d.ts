// Type definitions for get-stream 3.0
// Project: https://github.com/sindresorhus/get-stream#readme
// Definitions by: Douglas Duteil <https://github.com/douglasduteil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import {Stream} from 'stream';

interface Options {
    /**
     * Encoding of the incoming stream.
     * @default 'utf8'
     */
    encoding?: string;
    /**
     * Maximum length of the returned string. If it exceeds this value before
     * the stream ends, the promise will be rejected.
     * @default Infinity
     */
    maxBuffer?: number;
}

/**
 * Get the stream as a string.
 * The methods returns a promise that resolves when the end event fires on the
 * stream, indicating that there is no more data to be read.
 * The stream is switched to flowing mode.
 *
 * @param stream
 * @param options
 */
declare function getStrem(stream: Stream, options?: Options): Promise<string>;
declare namespace getStrem {
    function array<T>(stream: Stream, options?: Options): Promise<Array<T>>;
    function buffer(stream: Stream, options?: Options): Promise<Buffer>;
}

export = getStrem;
