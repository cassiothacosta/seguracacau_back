import {findRegisters} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import getRegisters from '../../src/pages/api/getRegisters';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('getRegisters', () => {
  it('should expose a function', () => {
		expect(getRegisters).toBeDefined();
	});
  
  it('getRegisters should return expected output', async () => {
    // const retValue = await getRegisters(req,res);
    expect(false).toBeTruthy();
  });
});