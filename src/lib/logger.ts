type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private context: LogContext = {}

  constructor(private name: string) {}

  private log(level: LogLevel, message: string, data?: unknown) {
    const timestamp = new Date().toISOString()
    // In production, you might send this to a logging service
    // For now, we'll use console with structured output
    const logMethod = level === 'error' ? console.error : console.log
    logMethod(`[${timestamp}] [${level.toUpperCase()}] [${this.name}] ${message}`, data ? data : '')
  }

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context }
    return this
  }

  debug(message: string, data?: unknown) {
    this.log('debug', message, data)
  }

  info(message: string, data?: unknown) {
    this.log('info', message, data)
  }

  warn(message: string, data?: unknown) {
    this.log('warn', message, data)
  }

  error(message: string, error?: unknown) {
    const errorData = error instanceof Error ? {
      errorMessage: error.message,
      stack: error.stack,
      name: error.name
    } : error

    this.log('error', message, errorData)
  }

  child(name: string) {
    const childLogger = new Logger(`${this.name}:${name}`)
    childLogger.context = { ...this.context }
    return childLogger
  }
}

export function createLogger(name: string) {
  return new Logger(name)
}