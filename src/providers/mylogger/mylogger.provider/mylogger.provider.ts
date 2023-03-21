import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class MyloggerProvider extends Logger {
  levels: string[] = ['error', 'warn', 'log', 'verbose', 'debug'];
  constructor(private config: ConfigService) {
    super();
    this.levels = this.config.get('loggerLevels');
  }

  log(message: string, context?: string) {
    if (this.levels.includes('log')) {
      super.log(message, context);
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.levels.includes('error')) {
      super.error(message, trace, context);
    }
  }

  warn(message: string, context?: string) {
    if (this.levels.includes('verbose')) {
      super.verbose(message, context);
    }
  }

  debug(message: string, context?: string) {
    if (this.levels.includes('debug')) {
      super.debug(message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (this.levels.includes('verbose')) {
      super.verbose(message, context);
    }
  }
}
