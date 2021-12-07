import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Home from './Views/Home';
import TeamList from './Views/TeamList';
import TeamDetail from './Views/TeamDetail';
import PlayerList from './Views/PlayerList';
import PlayerDetail from './Views/PlayerDetail';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <header>
          <NavLink to='/' className='app-link' exact> Home </NavLink>
          <NavLink to='/teams' className='app-link'exact> Teams </NavLink>
          <NavLink to='/players' className='app-link' exact> Players </NavLink>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/teams' component={TeamList} />
          <Route exact path='/teams/teamId' component={TeamDetail} />
          <Route exact path='/players' component={PlayerList} />
          <Route exact path='/players/playerId' component={PlayerDetail} />
        </Switch>

      </Router>

    </div>
  );
}

export default App;
