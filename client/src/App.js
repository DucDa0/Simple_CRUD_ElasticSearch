import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';

function App() {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
