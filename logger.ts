import os from 'os';
import winston from 'winston';
import { Syslog } from 'winston-syslog';

const papertrail = new Syslog({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT
    ? parseInt(process.env.PAPERTRAIL_PORT)
    : undefined,
  protocol: process.env.PAPERTRAIL_PROTOCOL,
  localhost: os.hostname(),
  eol: '\n',
});

const logger = winston.createLogger({
  format: winston.format.simple(),
  level: process.env.LOG_LEVEL || 'info',
  transports: [papertrail],
});

export default logger;
