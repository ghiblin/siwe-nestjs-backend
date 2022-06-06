import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

class MessageDto {
  @IsString()
  domain: string;
  
  @IsString()
  address: string;
  
  @IsOptional()
  @IsString()
  statement: string;
  
  @IsNumber()
  chainId: number;
  
  @IsString()
  nonce: string;
}

export class VerifyDto {
  @Type(() => MessageDto)
  message: MessageDto;

  @IsString()
  signature: string;
}