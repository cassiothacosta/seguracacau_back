import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'

describe('Home', () => {
    it('renders a heading', () => {
      render(<Home />)
  
      const heading = screen.getAllByRole('heading', {level: 2})
  
      expect(heading[0]).toBeInTheDocument()
    })
  })