import { screen, render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EditTeam from './EditTeam'
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


const server = setupServer(


rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam))
}

),
rest.patch('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json([mockTeam]));
    }
  )
);
beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

describe('edit team', () => {
it('edits an existing team', async () => {
    const history = createMemoryHistory()
    history.push('/teams/:id/edit')

    render(
    <Router history={history}>
        <Route exact path='/teams/:id/edit'>
            <EditTeam />
        </Route>
        <Route exact path='/teams/:teamId' component={TeamDetail}/>

    </Router>


    )
        screen.getByText('Loading...');

         await screen.findByLabelText(/name/i)
         await screen.findByLabelText(/city/i)
        await screen.findByLabelText(/state/i)
        const submitButton = await screen.findByRole('button', { name: 'Update' })
        const nameInput = await screen.findByDisplayValue('bad news bears')
        const cityInput = await screen.findByDisplayValue('Chicago')
        const stateInput = await screen.findByDisplayValue('IL')
        mockTeam.name = 'bad news cubs'
        mockTeam.city = 'Jersey City'
        mockTeam.state = 'NJ'
        userEvent.type(nameInput, 'bad news cubs')
        userEvent.type(cityInput, 'Jersey City')
        userEvent.type(stateInput, 'NJ')
        userEvent.click(submitButton)

        await screen.findByText('Loading...', { exact: false })

        await screen.findByText('bad news cubs', { exact: false })
})
})
