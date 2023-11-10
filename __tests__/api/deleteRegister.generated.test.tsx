import {removeRegister} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import deleteRegister from '../../src/pages/api/deleteRegister';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('deleteRegister', () => {
  it('should expose a function', () => {
		expect(deleteRegister).toBeDefined();
	});
  
  it('deleteRegister should return expected output', async () => {
    // const retValue = await deleteRegister(req,res);
    expect(false).toBeTruthy();
  });
});