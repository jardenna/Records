import { format } from 'date-fns';
import { promises as fsPromises } from 'fs'; // Correct import for fs promises
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
  const __dirname = path.resolve();

  try {
    const logDir = path.join(__dirname, '..', 'logs');

    // Check if directory exists, if not create it
    if (
      !(await fsPromises
        .access(logDir)
        .then(() => true)
        .catch(() => false))
    ) {
      await fsPromises.mkdir(logDir);
    }

    // Append the log file
    await fsPromises.appendFile(path.join(logDir, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};
