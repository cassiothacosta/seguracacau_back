import {addRegister} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import insertRegister from '../../src/pages/api/addRegister';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('insertRegister', () => {
  it('should expose a function', () => {
		expect(insertRegister).toBeDefined();
	});
  
  it('insertRegister should return expected output', async () => {
    // const retValue = await insertRegister(req,res);
    expect(false).toBeTruthy();
  });
});