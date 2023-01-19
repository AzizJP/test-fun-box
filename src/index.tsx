import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';

import './index.scss';

import App from './components/App/App';

const domContainer = document.getElementById('root');
const root = createRoot(domContainer);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
