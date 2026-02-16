import type { RefreshToken } from "./token.types.js";

const tokens: Map<string, RefreshToken> = new Map();

export const tokenRepository = {
  async save(token: RefreshToken) {
    tokens.set(token.token, token);
    return token;
  },

  async find(token: string) {
    return tokens.get(token);
  },

  async revoke(token: string) {
    tokens.delete(token);
  }
};
