import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import CreateFeed from '../routes/create-feed'
import NotFoundPage from '../routes/notfound';
import Header from './header';
import Sidebar from './sidebar';

import style from './style.css';

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root" class={style.app}>

            <Sidebar />

            <Header />

            <div class={style.body}>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/create-feed" component={CreateFeed} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
            </div>
        </div>
    );
};

export default App;
