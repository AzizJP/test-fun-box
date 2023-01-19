import {FC, memo} from 'react';

import './App.scss';

import Main from '../Main/Main';

const App: FC = memo(() => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <Main />
      </div>
    </div>
  );
});

export default App;
