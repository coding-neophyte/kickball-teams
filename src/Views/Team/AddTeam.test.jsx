import { screen, render } from '@testing-library/react'
import AddTeam from './AddTeam'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import TeamDetail from './TeamDetail'
import { MemoryRouter } from 'react-router'
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
    }

),

rest.post('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam))
    }
  )
);


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
            <Route path='/teams/new' component={AddTeam}/>
            <Route path='/teams/:teamId' component={TeamDetail} />
        </MemoryRouter>
    );

    screen.getByText('Add A Team');

    const nameField = screen.getByLabelText(/Name/i);
    // const cityField = screen.getByLabelText(/City/i);
    // const stateField = screen.getByLabelText(/State/i);
    const submitButton = screen.getByRole('button', { Name: 'Add' });

    userEvent.type(nameField, 'bad news bears' )
    // userEvent.type(cityField, 'Chicago')
    // userEvent.type(stateField, 'IL')
    userEvent.click(submitButton)

})
