// @ts-ignore
import { Diff, diff } from "deep-diff";
import merge from "lodash/merge";

import config from "./config";
import { LoggerConfig, LoggerSpace, PartialLoggerConfig } from "./types";

const getFormattedPath = (path: any[] = []) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  path.reduce((accum, item) => {
    const result = typeof item === "string" ? `['${item}']` : `[${item}]`;

    return `${accum}${result}`;
  }, "");

class Logger {
  private static readonly isEnabled: boolean = true;

  private readonly isTerminal: boolean;

  private spaces: LoggerConfig["spaces"];

  constructor(partialConfig: PartialLoggerConfig) {
    const loggerConfig = merge(config, partialConfig);
    this.spaces = loggerConfig.spaces;
    this.isTerminal = loggerConfig.isTerminal;
  }

  private static getTime(): string {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
    const millisecondsFormatted =
      // eslint-disable-next-line no-nested-ternary
      milliseconds < 10
        ? `00${milliseconds}`
        : milliseconds < 100
          ? `0${milliseconds}`
          : milliseconds;

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`;
  }

  private static transformObjectsToStrings(array: any[]) {
    return array.map((item) => {
      if (typeof item === "object") {
        return JSON.stringify(item, undefined, 2);
      }

      return item;
    });
  }

  private _logDiff(lhs: any, rhs: any) {
    type Kind = "D" | "E" | "N";
    const kinds: {
      [key in Kind]: { color: string; text: string };
    } = {
      D: { color: "#f44336", text: "deleted:" },
      E: { color: "#2196f3", text: "changed:" },
      N: { color: "#4caf50", text: "added:" },
    };

    const getStyle = (kind: Kind): string =>
      `color: ${kinds[kind].color}; font-weight: bold`;

    const getText = (kind: Kind): string =>
      this.isTerminal ? `${kinds[kind].text}` : `%c${kinds[kind].text}`;

    const getResult = (
      item: Diff<any, any>,
    ): [string, string, string, ...any[]] => {
      const result = [];

      switch (item.kind) {
        case "N": {
          result.push(item.rhs);
          break;
        }
        case "D": {
          result.push(item.lhs);
          break;
        }
        case "E": {
          result.push(item.lhs, "->", item.rhs);
          break;
        }
        case "A": {
          return getResult({
            ...item.item,
            path: [...(item.path || []), item.index],
          });
        }
      }

      return [
        getText(item.kind),
        getStyle(item.kind),
        `${getFormattedPath(item.path)}   `,
        ...result,
      ];
    };

    // eslint-disable-next-line unicorn/no-array-for-each
    diff(lhs, rhs)?.forEach((item: any) => {
      const result = getResult(item);

      if (this.isTerminal) {
        console.log(
          result[0],
          result[2],
          ...Logger.transformObjectsToStrings(result.slice(3)),
        );
      } else {
        console.log(...result);
      }
    });
  }

  private logFormatted(
    method: (message?: any, ...optionalParameters: any[]) => void,
    space: LoggerSpace,
    title?: string,
    messages?: any[],
  ) {
    const label = `${space.toUpperCase()} | ${Logger.getTime()}${
      title ? `  ${title}` : ""
    }`;
    const style = `${this.spaces[space].style} padding: 3px;`;

    if (this.isTerminal) {
      method(label);

      if (messages) {
        method(...Logger.transformObjectsToStrings(messages));
      }

      return;
    }

    if (!messages) {
      return method(`%c${label}`, style);
    }

    if (this.spaces[space].isCollapsed) {
      console.groupCollapsed(`%c${label}`, style);
    } else {
      console.group(`%c${label}`, style);
    }
    method(...messages);
    console.groupEnd();
  }

  public error(space: LoggerSpace, ...messages: any[]) {
    if (Logger.isEnabled && this.spaces[space].isEnabled) {
      console.error(...messages);
    }
  }

  public log(space: LoggerSpace, ...messages: any[]) {
    if (Logger.isEnabled && this.spaces[space].isEnabled) {
      const isFalsy = !messages[0];
      const isNumber = typeof messages[0] === "number";
      const isOneLineString =
        typeof messages[0] === "string" && !messages[0].includes("\n");

      if (messages.length === 1 && (isFalsy || isOneLineString || isNumber)) {
        return this.logFormatted(console.log, space, messages[0]);
      }

      this.logFormatted(console.log, space, undefined, messages);
    }
  }

  public logDiff(space: LoggerSpace, lhs: any, rhs: any) {
    if (Logger.isEnabled && this.spaces[space].isEnabled) {
      const label = `${space.toUpperCase()} | ${Logger.getTime()}`;
      const style = `${this.spaces[space].style} padding: 3px;`;

      if (this.isTerminal) {
        console.log(label);
      } else if (this.spaces[space].isCollapsed) {
        console.groupCollapsed(`%c${label}`, style);
      } else {
        console.group(`%c${label}`, style);
      }
      this._logDiff(lhs, rhs);
      console.groupEnd();
    }
  }

  public logWithTitle(space: LoggerSpace, title: string, ...messages: any[]) {
    if (Logger.isEnabled && this.spaces[space].isEnabled) {
      this.logFormatted(console.log, space, title, messages);
    }
  }

  public warn(space: LoggerSpace, ...messages: any[]) {
    if (Logger.isEnabled && this.spaces[space].isEnabled) {
      console.warn(...messages);
    }
  }

  // logNavState(currentNavState) {
  //   this.logDiff('navigation', this._prevNavState, currentNavState);
  //   this._prevNavState = currentNavState;
  // }
  //
  // _getLogRequestData = (query) => {
  //   const lines = query.split('\n');
  //
  //   // Remove empty strings.
  //   if (/^ *$/.test(lines[0])) {
  //     lines.shift();
  //   }
  //   if (/^ *$/.test(lines[lines.length - 1])) {
  //     lines.pop();
  //   }
  //
  //   // Remove left padding.
  //   const leftPadding = lines[0].length - lines[0].trimLeft().length;
  //   for (let i = 0; i < lines.length; i++) {
  //     lines[i] = lines[i].slice(leftPadding);
  //   }
  //
  //   const method = lines[0].match(/\w+/)?.[0] || '';
  //   const requestName = lines[1].match(/\w+/)?.[0] || '';
  //
  //   return {
  //     logTitle: `${method} - ${requestName}`,
  //     formattedRequest: lines.join('\n'),
  //   };
  // };
  //
  // logRequest = (body) => {
  //   if (!__DEV__) {
  //     return;
  //   }
  //
  //   const { logTitle, formattedRequest } = this._getLogRequestData(body.query);
  //   this.logWithTitle('network_request', logTitle, formattedRequest);
  // };
  //
  // logResponse = (body, data) => {
  //   if (!__DEV__) {
  //     return;
  //   }
  //
  //   const { logTitle } = this._getLogRequestData(body.query);
  //   this.logWithTitle('network_response', logTitle, data.data);
  // };
}

export default Logger;
