import { screen, render } from '@testing-library/react'

import { MemoryRouter, Route } from 'react-router'

import PlayerList from './PlayerList'

it('should render player list', async () => {
    render(
        <MemoryRouter initialEntries={['/players']}>

            <Route path='/players' component={PlayerList} />

        </MemoryRouter>
    );
    screen.getByText('Players')
    const playerList = await screen.findByText('Gary Coolman', { exact: false })
    expect(playerList).toBeInTheDocument();
})
