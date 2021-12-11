import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'

import TeamList from './TeamList'

it.skip('should render list of teams', async () => {
    render(
        <MemoryRouter initialEntries={['/teams']}>
            <Route path='/teams' component={TeamList} />
        </MemoryRouter>
    );
    screen.getByText('Teams')
    const teamList = await screen.findByText('Vancougers', { exact: false })

    expect(teamList).toBeInTheDocument()
})
