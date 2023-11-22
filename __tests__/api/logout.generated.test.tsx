import { removeTokenCookie } from '../../src/lib/auth-cookies'
import logout from '../../src/pages/api/logout';

jest.mock('../../lib/auth-cookies');

describe('logout', () => {
  it('should expose a function', () => {
		expect(logout).toBeDefined();
	});
  
  it('logout should return expected output', async () => {
    // const retValue = await logout(req,res);
    expect(false).toBeTruthy();
  });
});