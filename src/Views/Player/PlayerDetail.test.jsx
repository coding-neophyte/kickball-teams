import { screen, render, } from
'@testing-library/react'

import { MemoryRouter, Route } from 'react-router'

import PlayerDetail from './PlayerDetail'

it('should render a player detail', async () => {

        render(
            <MemoryRouter initialEntries={['/players/1']}>

     <Route path='/players/:playerId' component={PlayerDetail} />

            </MemoryRouter>
                );

                screen.getByText('Loading...')
                screen.debug()
              const playerName = await screen.findByText('Jetts', { exact: false })

            expect(playerName).toBeInTheDocument()
})
