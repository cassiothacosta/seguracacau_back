import { serialize, parse } from "cookie"
import { setTokenCookie, removeTokenCookie, parseCookies, getTokenCookie } from "../../src/lib/auth-cookies";
import { testApiHandler } from 'next-test-api-route-handler';
import Iron from '@hapi/iron'

jest.mock("next-auth/client");

describe('setTokenCookie', () => {
  it('should expose a function', () => {
    expect(setTokenCookie).toBeDefined();
  });

  it('setTokenCookie should return expected output', async () => {
    // await testApiHandler({
    //   handler: (req) => (req.headers),
    //   test: async({fetch}) => {

    //     const res = await fetch({method: 'POST', body: 'data'});
    //     const obj = { ...session, createdAt, maxAge: MAX_AGE, }
    //     const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)
    //     await expect(res.headers).toContain('Set-Cookie')
    //   }

    //   })
    // })
    expect(false).toBeTruthy();
  });
  describe('removeTokenCookie', () => {
    it('should expose a function', () => {
      expect(removeTokenCookie).toBeDefined();
    });

    it('removeTokenCookie should return expected output', () => {
      // const retValue = removeTokenCookie(res);
      expect(false).toBeTruthy();
    });
  });
  describe('parseCookies', () => {
    it('should expose a function', () => {
      expect(parseCookies).toBeDefined();
    });

    it('parseCookies should return expected output', () => {
      // const retValue = parseCookies(req);
      expect(false).toBeTruthy();
    });
  });
  describe('getTokenCookie', () => {
    it('should expose a function', () => {
      expect(getTokenCookie).toBeDefined();
    });

    it('getTokenCookie should return expected output', () => {
      // const retValue = getTokenCookie(req);
      expect(false).toBeTruthy();
    });
  });

});