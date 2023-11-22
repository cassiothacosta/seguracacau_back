import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../src/lib/password-local'
import { setLoginSession } from '../../src/lib/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import login from '../../src/pages/api/login';

jest.mock('passport');
jest.mock('next-connect');
jest.mock('../../lib/password-local');
jest.mock('../../lib/auth');
jest.mock('next');
jest.mock('cors');

describe('login', () => {
  it('should expose a function', () => {
		expect(login).toBeDefined();
	});
  
  it('login should return expected output', async () => {
    // const retValue = await login(req,res);
    expect(false).toBeTruthy();
  });
});