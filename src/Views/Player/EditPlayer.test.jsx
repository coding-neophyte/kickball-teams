import EditPlayer from "./EditPlayer";
import PlayerDetail from "./PlayerDetail";
import { screen, render } from '@testing-library/react'
import { rest } from "msw";
import { createMemoryHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { setupServer } from "msw/node";


const mockPlayer = {
    id: 13,
    name: 'simon says',
    position: 'center'
}


const server = setupServer(


    rest.get('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(ctx.json(mockPlayer))
    }

    ),
    rest.patch('https://gzugvrzklzlegewmiuem.supabase.co/rest/v1/players', (req, res, ctx) => {
        return res(ctx.json([mockPlayer]));
        }
      )
    );


    describe('edits player', () => {
        beforeAll(() => {
            server.listen()
        })

        afterAll(() => {
            server.close()
        })
        it('should edit a player', async () => {
            const history = createMemoryHistory()
            history.push('/players/:playerId/edit')

           render(
               <Router history={history}>
                   <Route exact path='/players/:playerId/edit'>
                       <EditPlayer />
                   </Route>
                   <Route exact path='/players/:playerId' component={PlayerDetail}/>
               </Router>
           )

           screen.getByText('Loading...')

           await screen.findByLabelText(/name/i)
           await screen.findByLabelText(/position/i)

        })
    })
