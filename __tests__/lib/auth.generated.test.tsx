import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from '../../src/lib/auth-cookies'
import { setLoginSession, getLoginSession } from '../../src/lib/auth';

jest.mock('@hapi/iron');
jest.mock('../../src/lib/auth-cookies');

describe('setLoginSession', () => {
  it('should expose a function', () => {
		expect(setLoginSession).toBeDefined();
	});
  
  it('setLoginSession should return expected output', async () => {
    // const retValue = await setLoginSession(res,session);
    expect(false).toBeTruthy();
  });
});
describe('getLoginSession', () => {
  it('should expose a function', () => {
		expect(getLoginSession).toBeDefined();
	});
  
  it('getLoginSession should return expected output', async () => {
    // const retValue = await getLoginSession(req);
    expect(false).toBeTruthy();
  });
});