import { screen, render } from '@testing-library/react'

import { MemoryRouter, Route } from 'react-router'

import Home from './Home'

it('should render home page', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Route path='/' component={Home} />
        </MemoryRouter>
    );

    screen.getByText('Kickball Team Directory')
    const buttonText = await screen.findByText('Enter')

    expect(buttonText).toBeInTheDocument()
})
