import {findRegistersGroupByType} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import getRegistersGroupByType from '../../src/pages/api/getRegistersGroupByType';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('getRegistersGroupByType', () => {
  it('should expose a function', () => {
		expect(getRegistersGroupByType).toBeDefined();
	});
  
  it('getRegistersGroupByType should return expected output', async () => {
    // const retValue = await getRegistersGroupByType(req,res);
    expect(false).toBeTruthy();
  });
});