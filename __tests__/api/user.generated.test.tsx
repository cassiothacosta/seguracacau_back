import { getLoginSession } from '../../src/lib/auth'
import { findUser } from '../../src/lib/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import user from '../../src/pages/api/user';

jest.mock('../../src/lib/auth');
jest.mock('../../src/lib/user');
jest.mock('next');
jest.mock('cors');

describe('user', () => {
  it('should expose a function', () => {
		expect(user).toBeDefined();
	});
  
  it('user should return expected output', async () => {
    // const retValue = await user(req,res);
    expect(false).toBeTruthy();
  });
});