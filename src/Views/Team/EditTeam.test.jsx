import { screen, render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EditTeam from './EditTeam'
import { MemoryRouter } from 'react-router'
import userEvent from '@testing-library/user-event'
import TeamDetail from './TeamDetail'

const mockTeam = {
    id: 7,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'bad news bears',
    city: 'Chicago',
    state: 'IL',
    players: [],

}

const mockTeam2 = {
    id: 7,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'bad news cubs',
    city: 'Chicago',
    state: 'IL',
    players: [],

}

const server = setupServer(


rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams/:teamId', (req, res, ctx) => {
    return res(ctx.json(mockTeam))
}

),
rest.put('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams/:id/edit', (req, res, ctx) => {
    return res(ctx.json(mockTeam2))
    }
  )
);
beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})


it('edits an existing team', async () => {
    render(
    <MemoryRouter initialEntries={['/teams/:teamId']}>
        <Route path='/teams/:teamId' component={TeamDetail}/>
        <Route path='/teams/:id/edit' component={EditTeam}/>
    </MemoryRouter>


    )
        screen.getByText('Update Team Info');

        const nameUpdate = screen.getLabelByText(/Name/i)
        const cityUpate = screen.getLabelByText(/City/i)
        co
})
