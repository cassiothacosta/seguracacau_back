import {findRegistersGroupByCategory} from '../../src/lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import getRegistersGroupByCategory from '../../src/pages/api/getRegistersGroupByCategory';

jest.mock('../../lib/register');
jest.mock('next');
jest.mock('cors');

describe('getRegistersGroupByCategory', () => {
  it('should expose a function', () => {
		expect(getRegistersGroupByCategory).toBeDefined();
	});
  
  it('getRegistersGroupByCategory should return expected output', async () => {
    // const retValue = await getRegistersGroupByCategory(req,res);
    expect(false).toBeTruthy();
  });
});