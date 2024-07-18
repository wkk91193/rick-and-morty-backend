const os = require('os');
const winston = require('winston');
require('winston-syslog');

const papertrail = new winston.transports.Syslog({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT,
  protocol: process.env.PAPERTRAIL_PROTOCOL,
  localhost: os.hostname(),
  eol: '\n',
});

const logger = winston.createLogger({
  format: winston.format.simple(),
  levels: winston.config.syslog.levels,
  transports: [papertrail],
});

export default logger;
