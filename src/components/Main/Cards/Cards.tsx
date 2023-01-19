import {FC, memo, useCallback, useEffect, useState} from 'react';

import Card from './Card/Card';

import './Cards.scss';
import {CardDescription} from './types';

const initialCards: Array<CardDescription> = [
  {
    id: '1',
    stuff: 'с фуагра',
    description: 'Печень утки разварная с артишоками.',
    packWeight: '0,5',
    numOfServings: 10,
    prize: 1,
    isSatisfied: false,
    isSelected: false,
    isEnded: false,
  },
  {
    id: '2',
    stuff: 'с рыбой',
    description: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
    packWeight: '2',
    numOfServings: 40,
    prize: 2,
    isSatisfied: false,
    isSelected: true,
    isEnded: false,
  },
  {
    id: '3',
    stuff: 'с курой',
    description: 'Филе из цыплят с трюфелями в бульоне.',
    packWeight: '5',
    numOfServings: 100,
    prize: 5,
    isSatisfied: true,
    isSelected: false,
    isEnded: true,
  },
];

const Cards: FC = memo(() => {
  const [cards, setCards] = useState<Array<CardDescription>>(
    JSON.parse(localStorage.getItem('cards')) || initialCards,
  );

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleUpdateCards = useCallback(
    (newCards: Array<CardDescription>) => {
      setCards(newCards);
    },
    [],
  );
  return (
    <div className="cards">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          handleUpdateCards={handleUpdateCards}
        />
      ))}
    </div>
  );
});

export default Cards;
