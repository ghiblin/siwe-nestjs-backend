import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SiweAuthGuard implements CanActivate {
  private readonly logger = new Logger(SiweAuthGuard.name);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    this.logger.verbose(`Checking authentication: ${JSON.stringify(request.session.siwe)}`)
    if (!request.session.siwe) {
      return false;
    }
    return true;
  }

}