import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'

import TeamList from './TeamList'

describe('list teams',() => {
it('should render list of teams', async () => {
    render(
        <MemoryRouter initialEntries={['/teams']}>
            <Route path='/teams' component={TeamList} />
        </MemoryRouter>
    );
    screen.getByText('Teams')
    const teamList = await screen.findByText('Taylor Gang', { exact: false })

    expect(teamList).toBeInTheDocument()
})
})
