import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Sidebar: FunctionalComponent = () => {
    return (
        <div class={style.sidebar}>
          <h1>Preact App</h1>

          <div style={{backgroundColor: "white", padding: "1em", textAlign: "center"}}>
            <Link activeClassName={style.active} href="/create-feed">
              CREATE FEED
            </Link>
          </div>
        </div>
    );
};

export default Sidebar;
