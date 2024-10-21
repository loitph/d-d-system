import './Hall.css';

import { useEffect, useState } from 'react';
import { LIST_CARD_DEFAULT, SLOTS } from '../../constant/mockup';
import { useStorage } from '../../contexts/Storage.context';

export default function Hall({ receiveOrder }) {
  const { storage, updateStorage } = useStorage();

  const listSlot = SLOTS;

  const listCard = LIST_CARD_DEFAULT;

  // handle list card
  const [ cards, setCards ] = useState(listCard);

  // Drag start
  // using useState to allow tranfer data greater than event.dataTransfer
  const handleDragStart = (event, card) => {

    const data = storage;

    data.id = card.id;
    data.slot = card.slot;
    data.value = card.value;

    updateStorage(data)
  };


  const handleClick = (card) => {
    const data = storage;

    data.id = card.id;
    data.slot = card.slot;
    data.value = card.value;

    updateStorage(data)

    console.log(data);
  };

  const handleAfterDrop = (selectedId) => {
    const newCards = cards.filter(c => c.id !== selectedId);

    setCards([...newCards]);
  };

  useEffect(() => {
    if (!receiveOrder?.curr || !receiveOrder?.target || !receiveOrder?.data?.id) {
      return;
    }

    handleAfterDrop(receiveOrder.data.id);
  }, [receiveOrder]);


  return (
    <>
      <div className="slots hall">
        {
          listSlot.map((slotPiece) => (
            <div
              className="slot"
              key={slotPiece}
            >
              {
                cards
                  .filter((card) => card.slot === slotPiece)
                  .map((card) => (
                    <div
                      key={card.id}
                      className="card"

                      // this make card are draggable
                      draggable
                      onDragStart={(e) => handleDragStart(e, card)}

                      onClick={() => handleClick(card)}
                    >
                      { card.value }
                    </div>
                  ))
              }
            </div>
          ))
        }
      </div>
    </>
  );
}