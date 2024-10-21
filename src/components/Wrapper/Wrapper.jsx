import './Wrapper.css';

import { useState } from 'react';
import { SLOTS } from '../../constant/mockup';

import { useStorage } from '../../contexts/Storage.context';

const Wrapper = ({ onSendOrder }) => {
  const { storage, updateStorage } = useStorage();
  const listSlot = SLOTS;

  // handle list card
  const [ cards, setCards ] = useState([]);

  // Drag start
  // using useState to allow tranfer data greater than event.dataTransfer
  const handleDragStart = (event, card) => {
    const data = storage;

    data.id = card.id;
    data.slot = card.slot;
    data.value = card.value;

    updateStorage(data)
  };

  // Drag and drop never work without this event
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  // Handle update list card after drop
  // 1. make a copy of card was selected
  // 2. move it to new slot
  const handlerTransferCard = (card, newSlot) => {
    const newListCard = [...cards];
    const cardSelected = newListCard.find(i => i.id === card.id);

    if (!cardSelected) {
      let newCard = {...card};
      newCard.slot = newSlot;
      newListCard.push(newCard);
    } else {

      cardSelected.slot = newSlot;
    }


    setCards(newListCard);
  };

  const handleDrop = (event, slot) => {
    const cardSelected = {...storage};
    handlerTransferCard(cardSelected, slot);

    // send data
    handleSendOrder(cardSelected);
  };

  const handleSendOrder = (param) => {
    const res = {
      curr: 'Wrapper',
      target: 'Hall',
      data: param
    };
    
    onSendOrder(res);
  };

  const handleClick = (card) => {
    const data = storage;

    data.id = card.id;
    data.slot = card.slot;
    data.value = card.value;

    updateStorage(data)
  };


  return (
    <>
      <div className="slots wrapper">
        {
          listSlot.map((slotPiece) => (
            <div
              className="slot"
              key={slotPiece}

              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slotPiece)}
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
};

export default Wrapper;