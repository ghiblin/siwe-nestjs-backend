import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateNonce, SiweMessage } from 'siwe';
import { VerifyDto } from './dtos/verify.dto';
import { SiweAuthGuard } from './guards/siwe-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('/nonce')
  async getNonce(@Req() req: Request, @Res() res: Response) {
    req.session.nonce = generateNonce()
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(req.session.nonce)
  }

  @Post('/verify')
  async verify(@Body() verifyDto: VerifyDto, @Req() req: Request, @Res() res: Response) {
    try {
      let message = new SiweMessage(verifyDto.message)
      const fields = await message.validate(verifyDto.signature);
      if (fields.nonce !== req.session.nonce) {
        throw new BadRequestException('Invalid nonce.')
      }
      req.session.siwe = fields
      req.session.cookie.expires = new Date(fields.expirationTime);
      req.session.save(() => res.status(200).end())
    } catch(err) {

      delete req.session.nonce;
      throw err;
    }

  }

  @UseGuards(SiweAuthGuard)
  @Get('/personal_info')
  async getPersonalInfo(@Req() req: Request) {
    return {
      message: `You are authenticated and your address is ${req.session.siwe!.address}`
    }
  }
}
