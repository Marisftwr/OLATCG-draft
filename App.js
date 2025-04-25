import './index.css'
import './App.css';
import {BrowserRouter as Router, Routes/*O Switch não existe mais*/, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Ferramentas from './components/pages/Ferramentas';
import Analises from './components/pages/Analises';
import Aprender from './components/pages/Aprender';
import Container from './components/layout/Container';

function App() {
  return (
    <div className="App">
    <Container>
      <Router>
         <ul>
            <li>Home</li>
            <li>Análises</li>
            <li>Ferramentas</li>
            <li>Aprender</li>
          </ul>
        <Routes>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Ferramentas">
            <Ferramentas />
          </Route>
          <Route exact path="/Analises">
            <Analises />
          </Route>
          <Route exact path="/Aprender">
            <Aprender/>
          </Route>
        </Routes>
      </Router>
    </Container>
    </div>
  );
}

export default App;
