import { screen, render, } from
'@testing-library/react'

import { MemoryRouter } from 'react-router'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import PlayerDetail from './PlayerDetail'

const mockPlayer = {
  id: 12,
  name: 'benny',
  position: 'jeff',

}

const server = setupServer(
  rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/players', (req, res, ctx) => {
      return res(ctx.json(mockPlayer));
  }),
  rest.post('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/players', (req, res, ctx) => {
      return res(ctx.json([mockPlayer]))
      }
    )
);
describe('render a player',() => {
  beforeAll(() => {
      server.listen()
  })

  afterAll(() => {
      server.close()
  })

it('should render a player detail', async () => {

        render(
            <MemoryRouter initialEntries={['/players/12']}>

              <PlayerDetail />

            </MemoryRouter>
                );

                screen.getByText('Loading...')
              const playerName = await screen.findByText('benny', { exact: false })

            expect(playerName).toBeInTheDocument()
})
})
