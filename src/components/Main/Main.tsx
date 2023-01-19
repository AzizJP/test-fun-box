import {FC, memo} from 'react';

import Cards from './Cards/Cards';

import './Main.scss';

const Main: FC = memo(() => {
  return (
    <div className="main">
      <h1 className="main__title">Ты сегодня покормил кота?</h1>
      <Cards />
    </div>
  );
});

export default Main;
