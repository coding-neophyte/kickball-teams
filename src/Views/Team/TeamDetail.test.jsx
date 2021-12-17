import { screen, render } from '@testing-library/react'
import TeamDetail from './TeamDetail'
import { MemoryRouter } from 'react-router'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const mockTeam = {
    id: 6,
    name: 'hoosier',
    city: 'jersey',
    state: 'nj',
    players: [{ id: 100, name: 'Joe Byron', position: 'left field' }]

}

const server = setupServer(
    rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(ctx.json(mockTeam));
    }),
    rest.post('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(ctx.json([mockTeam]))
        }
      )
);




describe('render a team',() => {
    beforeAll(() => {
        server.listen()
    })

    afterAll(() => {
        server.close()
    })

it('should render single team', async () =>{
    render(
        <MemoryRouter initialEntries={['/teams/6']}>
            <TeamDetail />
        </MemoryRouter>
    );
    screen.getByText('Loading...')
    const details = await screen.findByText('Joe Byron', { exact : false })

    expect(details).toBeInTheDocument()
})
})
