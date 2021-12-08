import { screen, render } from '@testing-library/react'

import { MemoryRouter, Route } from 'react-router'

import TeamDetail from './TeamDetail'

it('should render single team', async () =>{
    render(
        <MemoryRouter initialEntries={['/teams/4']}>
            <Route path='/teams/:teamId' component={TeamDetail} />

        </MemoryRouter>
    );
    screen.getByText('Loading...')
    const details = await screen.findByText('Joe Bauers', { exact : false })

    expect(details).toBeInTheDocument()
})
