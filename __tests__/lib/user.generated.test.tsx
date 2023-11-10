import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'
import excuteQuery, { createUser, findUser, validatePassword } from '../../src/lib/user';

jest.mock('crypto');
jest.mock('uuid');
jest.mock('mysql2/promise');

describe('excuteQuery', () => {
  it('should expose a function', () => {
		expect(excuteQuery).toBeDefined();
	});
  
  it('excuteQuery should return expected output', async () => {
    // const retValue = await excuteQuery();
    expect(false).toBeTruthy();
  });
});
describe('createUser', () => {
  it('should expose a function', () => {
		expect(createUser).toBeDefined();
	});
  
  it('createUser should return expected output', () => {
    // const retValue = createUser();
    expect(false).toBeTruthy();
  });
});
describe('findUser', () => {
  it('should expose a function', () => {
		expect(findUser).toBeDefined();
	});
  
  it('findUser should return expected output', async () => {
    // const retValue = await findUser();
    expect(false).toBeTruthy();
  });
});
describe('validatePassword', () => {
  it('should expose a function', () => {
		expect(validatePassword).toBeDefined();
	});
  
  it('validatePassword should return expected output', () => {
    // const retValue = validatePassword(user,inputPassword);
    expect(false).toBeTruthy();
  });
});