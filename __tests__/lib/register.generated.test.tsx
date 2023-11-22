import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'
import { findUser } from '../../src/lib/user'
import executeQuery, { addRegister, removeRegister, findSingleRegister, findRegisters, findRegistersGroupByCategory, findRegistersGroupByType, findRegistersByDate } from '../../src/lib/register';

jest.mock('uuid');
jest.mock('mysql2/promise');
jest.mock('../../src/lib/user');

describe('executeQuery', () => {
  it('should expose a function', () => {
		expect(executeQuery).toBeDefined();
	});
  
  it('executeQuery should return expected output', async () => {
    // const retValue = await executeQuery();
    expect(false).toBeTruthy();
  });
});
describe('addRegister', () => {
  it('should expose a function', () => {
		expect(addRegister).toBeDefined();
	});
  
  it('addRegister should return expected output', async () => {
    // const retValue = await addRegister();
    expect(false).toBeTruthy();
  });
});
describe('removeRegister', () => {
  it('should expose a function', () => {
		expect(removeRegister).toBeDefined();
	});
  
  it('removeRegister should return expected output', async () => {
    // const retValue = await removeRegister();
    expect(false).toBeTruthy();
  });
});
describe('findSingleRegister', () => {
  it('should expose a function', () => {
		expect(findSingleRegister).toBeDefined();
	});
  
  it('findSingleRegister should return expected output', async () => {
    // const retValue = await findSingleRegister();
    expect(false).toBeTruthy();
  });
});
describe('findRegisters', () => {
  it('should expose a function', () => {
		expect(findRegisters).toBeDefined();
	});
  
  it('findRegisters should return expected output', async () => {
    // const retValue = await findRegisters();
    expect(false).toBeTruthy();
  });
});
describe('findRegistersGroupByCategory', () => {
  it('should expose a function', () => {
		expect(findRegistersGroupByCategory).toBeDefined();
	});
  
  it('findRegistersGroupByCategory should return expected output', async () => {
    // const retValue = await findRegistersGroupByCategory();
    expect(false).toBeTruthy();
  });
});
describe('findRegistersGroupByType', () => {
  it('should expose a function', () => {
		expect(findRegistersGroupByType).toBeDefined();
	});
  
  it('findRegistersGroupByType should return expected output', async () => {
    // const retValue = await findRegistersGroupByType();
    expect(false).toBeTruthy();
  });
});
describe('findRegistersByDate', () => {
  it('should expose a function', () => {
		expect(findRegistersByDate).toBeDefined();
	});
  
  it('findRegistersByDate should return expected output', async () => {
    // const retValue = await findRegistersByDate();
    expect(false).toBeTruthy();
  });
});