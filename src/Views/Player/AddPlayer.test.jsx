import { screen, render } from '@testing-library/react'
import AddPlayer from './AddPlayer'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import TeamDetail from '../Team/TeamDetail'

const mockPlayer1 = {
    id: 9,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'Flavor Flav',
    position: '3rd Base'
}


const server = setupServer(
    rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
        return res(ctx.json(mockPlayer1))
    }),


rest.post('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockPlayer1))
})
);

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

it('should add new player', async () => {
    const history = createMemoryHistory()
    history.push('/players/new/:teamId')

    render(
        <Router history={history}>
            <Route path='/players/new/:teamId' component={AddPlayer} />
            <Route path='/teams/:teamId' component={TeamDetail} />
        </Router>
    );

    screen.getByText('Add Player')
    const nameField =  await screen.findByLabelText(/name:/i)
    const positionField = await screen.findByLabelText(/position/i)


    const addButton = await screen.findByRole('button', { name: 'Add'})

    userEvent.type(nameField, 'Flavor Flav')
    userEvent.type(positionField, '3rd Base')
    userEvent.click(addButton)

})
