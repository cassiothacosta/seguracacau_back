import {findRegistersByDate} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import getRegistersByDate from '../../src/pages/api/getRegistersByDate';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('getRegistersByDate', () => {
  it('should expose a function', () => {
		expect(getRegistersByDate).toBeDefined();
	});
  
  it('getRegistersByDate should return expected output', async () => {
    // const retValue = await getRegistersByDate(req,res);
    expect(false).toBeTruthy();
  });
});