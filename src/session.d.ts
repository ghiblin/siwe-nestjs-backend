import { SiweMessage } from "siwe";

declare module "express-session" {
  interface SessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}

export {}