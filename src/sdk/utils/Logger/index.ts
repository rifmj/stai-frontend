import Logger from './Logger';
import { PartialLoggerConfig } from './types';

let partialConfig: PartialLoggerConfig = {
  spaces: {},
};

const logger = new Logger(partialConfig);

export default logger;

export { LoggerSpace } from './types';
