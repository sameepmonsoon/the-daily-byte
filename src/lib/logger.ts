import { isProduction } from '@/configs/global-configs';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug' | 'trace';

interface LogUtil {
  log(message?: string, ...data: unknown[]): void;
  info(message?: string, ...data: unknown[]): void;
  warn(message?: string, ...data: unknown[]): void;
  error(message?: string, err?: unknown): void;
  debug(message?: string, ...data: unknown[]): void;
  trace(message?: string, ...data: unknown[]): void;
}

function formatMessage(level: LogLevel, message?: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message ?? ''}`;
}

function safeConsoleCall(fn: (...args: unknown[]) => void, ...args: unknown[]) {
  try {
    fn(...args);
  } catch (err) {
    console.error('Could not display log', err);
  }
}

const logger: LogUtil = {
  log(message?: string, ...data: unknown[]) {
    if (!isProduction) safeConsoleCall(console.log, formatMessage('log', message), ...data);
  },
  info(message?: string, ...data: unknown[]) {
    if (!isProduction) safeConsoleCall(console.info, formatMessage('info', message), ...data);
  },
  warn(message?: string, ...data: unknown[]) {
    if (!isProduction) safeConsoleCall(console.warn, formatMessage('warn', message), ...data);
  },
  error(message?: string, err?: unknown) {
    // Errors should always log, even in production
    safeConsoleCall(console.error, formatMessage('error', message), err);
  },
  debug(message?: string, ...data: unknown[]) {
    if (!isProduction) safeConsoleCall(console.debug, formatMessage('debug', message), ...data);
  },
  trace(message?: string, ...data: unknown[]) {
    if (!isProduction) safeConsoleCall(console.trace, formatMessage('trace', message), ...data);
  },
};

export default logger;
