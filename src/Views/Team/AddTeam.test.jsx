import { screen, render, waitFor } from '@testing-library/react'
import AddTeam from './AddTeam'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Switch, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import TeamDetail from './TeamDetail'
import userEvent from '@testing-library/user-event'

const mockTeam = {
    id: 7,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'bad news bears',
    city: 'Chicago',
    state: 'IL',
    players: [],

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

describe.only('add a team',() => {

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

it('should create new team', async () => {
    const history =  createMemoryHistory()
    history.push('/teams/new')

    render(
        <MemoryRouter initialEntries={['/teams/new']}>
            <Switch>
            <Route exact path='/teams/new'>
                <AddTeam />
             </Route>

            <Route exact path='/teams/:teamId' component={TeamDetail} />
            </Switch>
        </MemoryRouter>
    );

    screen.getByText('Add A Team');

    const nameField = await screen.findByLabelText(/Name/i);
    const cityField = await screen.findByLabelText(/City/i);
    const stateField = await screen.findByLabelText(/State/i);
    const submitButton = await screen.findByRole('button', { name: 'Add' });

    userEvent.type(nameField, 'bad news bears' )
    userEvent.type(cityField, 'Chicago')
    userEvent.type(stateField, 'IL')
    userEvent.click(submitButton)

    await waitFor(() => screen.getByText('Loading...', { exact: false }))

})
})
