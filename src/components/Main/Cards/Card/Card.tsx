import {FC, memo, useCallback, useMemo, useState} from 'react';

import {getWordEnding} from '../../../../utils/helpers';

import {CardDescription} from '../types';

import './Card.scss';

interface CardProps {
  card: CardDescription;
  handleUpdateCards(newCards: Array<CardDescription>): void;
}

const Card: FC<CardProps> = memo(({card, handleUpdateCards}) => {
  const [cardData, setCardData] = useState<CardDescription>({
    ...card,
  });
  const [visited, setVisited] = useState(false);

  const activateHover = useCallback(() => {
    setVisited(true);
  }, []);

  const hanadleCardsUpdate = useCallback(
    (newState: CardDescription) => {
      const newCards = JSON.parse(localStorage.getItem('cards'));
      const cardIndex = newCards.findIndex(
        (el: CardDescription) => el.id === cardData.id,
      );
      const copyProject = [...newCards];
      copyProject.splice(cardIndex, 1, newState);
      handleUpdateCards(copyProject);
    },
    [cardData.id, handleUpdateCards],
  );

  const toggleCardSelectChange = useCallback(() => {
    const newState = {...cardData, isSelected: !cardData.isSelected};
    setCardData(newState);
    hanadleCardsUpdate(newState);
    setVisited(false);
  }, [cardData, hanadleCardsUpdate]);

  const underCardText = () => {
    if (cardData.isEnded) {
      return (
        <p className="card__bottom-text card__bottom-text_color">{`Печалька, ${cardData.stuff} закончился`}</p>
      );
    }
    if (cardData.isSelected) {
      return (
        <p className="card__bottom-text">{cardData.description}</p>
      );
    }
    return (
      <div className="card__bottom-text_wrapper">
        <p className="card__bottom-text">{`Чего сидишь? Порадуй котэ, `}</p>
        <button
          type="button"
          className="card__bottom-text card__bottom-text_button"
          onClick={toggleCardSelectChange}
        >
          купи.
        </button>
      </div>
    );
  };

  const disabledCard = () => {
    if (cardData.isEnded) {
      return <div className="card__disabled" />;
    }
  };

  const cardHover = useMemo(() => {
    if (!visited) return;
    return cardData.isSelected ? 'card_selected-hover' : '';
  }, [cardData.isSelected, visited]);

  return (
    <article className="card__section">
      <button
        className={`card ${cardData.isEnded ? 'card_ended' : ''} ${
          cardData.isSelected ? 'card_selected' : 'card-hover'
        } ${cardHover}`}
        onClick={toggleCardSelectChange}
        onMouseOut={activateHover}
        onBlur={() => {}}
        disabled={cardData.isEnded}
      >
        {disabledCard()}
        <div
          className={`card__border ${
            cardData.isEnded ? 'card__border_disabled' : ''
          } ${cardData.isSelected ? 'card__border_selected' : ''}`}
        />
        <div className="card__photo" />
        <div
          className={`card__circle ${
            cardData.isEnded ? 'card__circle_disabled' : ''
          } ${cardData.isSelected ? 'card__circle_selected' : ''}`}
        >
          <p className="card__weight">{cardData.packWeight}</p>
          <p className="card__weight">кг</p>
        </div>
        <h4 className="card__name">Сказочное заморское явство</h4>
        <h2 className="card__title">Нямушка</h2>
        <h3 className="card__stuff">{cardData.stuff}</h3>
        <p className="card__description">{`${
          cardData.numOfServings
        } ${getWordEnding(
          cardData.numOfServings,
          'порция',
          'порции',
          'порций',
        )}`}</p>
        <p className="card__description">
          {`${cardData.prize <= 1 ? '' : cardData.prize} 
        ${getWordEnding(
          cardData.prize,
          'мышь',
          'мыши',
          'мышей',
        )} в подарок`}
        </p>
      </button>
      <div>{underCardText()}</div>
    </article>
  );
});

export default Card;
