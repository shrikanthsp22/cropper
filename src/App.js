import React from 'react';
import HomePage from './Pages/HomePage';
import Showuploadedimages from './Pages/ShowUploadedImages';
import { Switch, Route } from 'react-router-dom';
import { Title } from './styles';
import { Menu } from './Pages/Menu';
import { CONSTANTS } from './CONSTANTS';
import { About } from './Pages/About'

function App() {
  return (
    <div>
      <Title>
        <a href="/" style={{ color: 'white', fontSize: '2rem', cursor: 'pointer', textDecoration: 'none' }}>{CONSTANTS.HEADER}</a>
        <Menu />
      </Title>
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/' component={HomePage} />
        <Route path='/view' component={Showuploadedimages} />
      </Switch>
    </div>
  );
}

export default App;
