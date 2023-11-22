import { createUser } from '../../src/lib/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import signup from '../../src/pages/api/signup';

jest.mock('../../lib/user');
jest.mock('next');
jest.mock('cors');

describe('signup', () => {
  it('should expose a function', () => {
		expect(signup).toBeDefined();
	});
  
  it('signup should return expected output', async () => {
    // const retValue = await signup(req,res);
    expect(false).toBeTruthy();
  });
});