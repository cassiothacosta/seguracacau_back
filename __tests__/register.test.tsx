import { render, screen } from '@testing-library/react'
import {addRegister, removeRegister, findSingleRegister, findRegisters, findRegistersGroupByCategory, findRegistersGroupByType} from '../src/lib/register'



describe('addRegister', () => {
    it('verify connection', () =>{
        const response = addRegister({'username': String, 'name': String, 'type': String, 'category': String, 'period': String, 'value': String})

        expect(response).toHaveAttribute('name')
    })
})


  
describe('findSingleRegister', () =>{
    it('verify connection', () =>{
        const response = findSingleRegister({'username': String, 'name': String})

        expect(response).toHaveAttribute('name')
    })
}) 
 
describe('findRegisters', () =>{
    it('verify connection', () =>{
        const response = findRegisters({'username': String, 'name': String})

        expect(response).toHaveAttribute('name')
    })
})
 
describe('findRegistersGroupByCategory', () =>{    
    it('verify connection', () =>{
        const response = findSingleRegister({'username': String, 'name': String})

        expect(response).toHaveAttribute('name')
    })
})
  
describe('findRegistersGroupByType', () =>{
    it('verify connection', () =>{
        const response = findSingleRegister({'username': String, 'name': String})

        expect(response).toHaveAttribute('name')
    })
})
 
describe('removeRegister', () =>{
    it('verify connection', () =>{
        const response = removeRegister({'username': String, 'name': String})

        expect(response).toHaveAttribute('name')
    })
})