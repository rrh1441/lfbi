type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: any
}

class Logger {
  private context: LogContext = {}

  constructor(private name: string) {}

  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      level,
      logger: this.name,
      message,
      ...this.context,
      ...(data && { data })
    }

    // In production, you might send this to a logging service
    // For now, we'll use console with structured output
    const logMethod = level === 'error' ? console.error : console.log
    logMethod(`[${timestamp}] [${level.toUpperCase()}] [${this.name}] ${message}`, data ? data : '')
  }

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context }
    return this
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data)
  }

  info(message: string, data?: any) {
    this.log('info', message, data)
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data)
  }

  error(message: string, error?: any) {
    const errorData = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      ...error
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