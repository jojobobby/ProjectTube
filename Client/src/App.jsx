import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import VideoEditor from './pages/VideoEditor';
import Login from './pages/Login';
import Header from './components/Header';
import Notification from './components/Notification';

const App = () => {
  return (
    <Router>
      <Header />
      <Notification />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/video-editor" component={VideoEditor} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
