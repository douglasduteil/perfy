// Type definitions for npmlog 4.1
// Project: https://github.com/npm/npmlog#readme
// Definitions by: Charles Samborski <https://github.com/demurgos>
//                 Douglas Duteil <https://github.com/douglasduteil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { EventEmitter } from "events";
import { Stream } from "stream";

import { Tracker, TrackerGroup, TrackerStream } from 'are-we-there-yet';


export = npmlog;

declare const npmlog: npmlog.NpmLog;

declare namespace npmlog {
    type NpmLog =
        Core &
        LogColor &
        LogStyle &
        LogProgress &
        TrackerConstructors &
        LogEmitter &
        LogFunctions;

    interface Core {
        gauge: any; // requires 'gauge' pacakge typings

        /**
         * The level to display logs at. Any logs at or above this level will be displayed. The special level `silent` will
         * prevent anything from being displayed ever.
         */
        level: LogLevel | string;

        /**
         * If set, a heading that is printed at the start of every line.
         */
        heading: string;

        /**
         * The stream where output is written.
         */
        stream: Stream;
        /**
         * Sets up a new level with a shorthand function and so forth.
         *
         * Note that if the number is Infinity, then setting the level to that will cause all log messages to be
         * suppressed. If the number is -Infinity, then the only way to show it is to enable all log messages.
         */
        addLevel(level: string, n: number, style: Style, disp?: string | number): void;

        log(level: string, prefix: string | boolean, ...message: any[]): void;

        write(message: string, style?: Style): void;
    }

    interface LogStyle {
        prefixStyle: Style;
        headingStyle: Style;
        style: Style;
    }
    interface LogColor {
        disableColor(): void;
        enableColor(): void;
        useColor():  boolean;
    }

    interface LogProgress {
        tracker: TrackerGroup;

        /**
         * Clear progress
         */
        clearProgress(): void;

        /**
         * Disable the display of a progress bar
         */
        disableProgress(): void;

        /**
         * Enable the display of log activity spinner and progress bar
         */
        enableProgress(): void;

        /**
         * Force the unicode theme to be used for the progress bar.
         */
        enableUnicode(): void;

        pause(): void;

        resume(): void;

        progressEnabled: boolean;

        showProgress(name: string, completed?: boolean): void;

        setGaugeTemplate(template: any): void; // requires 'gauge' pacakge typings

    }

    interface TrackerConstructors {
        /**
         * This adds a new are-we-there-yet item tracker to the progress tracker. The object returned has the log[level]
         * methods but is otherwise an are-we-there-yet Tracker object.
         */
        newItem(name?: string, todo?: number, weight?: number): Tracker & NpmLog;

        /**
         * This adds a new are-we-there-yet tracker group to the progress tracker. The object returned has the log[level]
         * methods but is otherwise an are-we-there-yet TrackerGroup object.
         */
        newGroup(name?: string, weight?: number): TrackerGroup & NpmLog;

        /**
         * This adds a new are-we-there-yet stream tracker to the progress tracker. The object returned has the log[level]
         * methods but is otherwise an are-we-there-yet TrackerStream object.
         */
        newStream(name?: string, todo?: number, weight?: number): TrackerStream & NpmLog;
    }

    type LogLevel =
        'error' |
        'http' |
        'info' |
        'notice' |
        'silly' |
        'silent' |
        'timing' |
        'verbose' |
        'warn' |
        string;

    type LogFunctions = {
        [level in LogLevel]: (prefix: string | boolean, ...message: any[]) => void;
    }

    interface LogEmitter extends EventEmitter {
        on(event: 'log', listener: (message?: Message) => any): this;
        on(event: 'error', listener: (error?: Error) => any): this;
        on(event: string, listener: Function): this;

        once(event: 'log', listener: (message?: Message) => any): this;
        once(event: 'error', listener: (error?: Error) => any): this;
        once(event: string, listener: Function): this;
    }

    /**
     * Style Objects
     */
    export interface Style {
        /**
         * Causes the termianl to beep
         */
        beep?: boolean;
        /**
         * Color for the background
         */
        bg?: string;
        /**
         * Use bold style
         */
        bold?: boolean;
        /**
         * Color for the foreground text
         */
        fg?: string;
        /**
         * Use inverse style
         */
        inverse?: boolean;
        /**
         * Use underline style
         */
        underline?: boolean;
    }

    /**
     * Message Objects
     *
     * Every log event is emitted with a message object, and the log.record list contains all of them that have been
     * created. They have the following fields:
     */
    interface Message {
        id: number;
        level: string;
        prefix: string;
        /**
         * Result of util.format()
         */
        message: string;
        /**
         * Arguments to util.format()
         */
        messageRaw: any[];
    }
}
