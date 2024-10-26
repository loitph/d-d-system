import './Wrapper.css';

import { useContext, useEffect, useState } from 'react';
import { ADD_SLOT, ADD_WIDGET, SLOTS } from '../../constant/mockup';
import { StoreContext } from '../../contexts/Store.context';
import Greeting from '../Greeting/Greeting';
import ModeDisplay from '../ModeDisplay/ModeDisplay';
import AddWidget from '../AddWidget/AddWidget';
import AddBoardSlot from '../AddBoardSlot/AddBoardSlot';
import { MinusOutlined } from '@ant-design/icons';


const Wrapper = ({ onSendOrder }) => {
  const { widgetDragged, setWidgetDragged } = useContext(StoreContext);
  const { userConfig, setUserConfig } = useContext(StoreContext);
  const [ board, setBoard ] = useState([]);
  const [ visibleItems, setVisibleItems ] = useState([]);

  // Drag and drop never work without this event
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleOnDrop = (boardSlotId) => {
    let items = [...visibleItems];
    
    const itemDropped = {...widgetDragged};
    itemDropped.slot = boardSlotId;

    const isExist = items.find(item => item.id === itemDropped.id);
    if (isExist) {
      isExist.value = itemDropped.value;
      isExist.slot = boardSlotId;
    } else {
      items.push(itemDropped);
    }
    setVisibleItems(items);
  };

  const handleAddSlot = () => {
    let items = [...userConfig.board].filter(i => i.type !== 'AddWidget');
    let newSlot = {
      id: crypto.randomUUID(),
      name: '',
    };
    newSlot.name = 's' + (items.length + 1);

    items.push(newSlot);

    setBoard(items);

    const newConfig = {...userConfig};
    newConfig.board = items;

    setUserConfig({...newConfig});
  };

  const onDeleteVisibleItem = (param) => {
    let items = [...visibleItems];
    items = items.filter(i => i.id !== param.id);

    setVisibleItems([...items]);
  };

  useEffect(() => {
    if (!userConfig?.id) {
      return;
    }

    let items = [...userConfig.board].filter(i => i.type !== 'AddSlot');
    items.push(ADD_SLOT);

    setBoard(items);

    // console.log(userConfig);

    setVisibleItems([...userConfig.widget]);
  }, [userConfig]);

  const handleDisplayItems = (boardSlot) => {
    const items = visibleItems
      .filter((item) => item.slot === boardSlot.id)
      .filter((item) => userConfig.widget.find(w => w.id === item.id));

    if (items.length) {
      return items.map((item) => {
        switch (item.type) {
          case 'Greeting':
            return <Greeting
              key={item.id}
              data={item}
              class={'card'}
              onDeleteVisibleItem={() => onDeleteVisibleItem(item)}
            />;
          case 'ModeDisplay':
            return <ModeDisplay
              key={item.id}
              data={item}
              class={'card'}
              onDeleteVisibleItem={() => onDeleteVisibleItem(item)}
            />;
        }
      });
    }
  };

  const handleClearSlot = (slotId) => {
    let items = [...userConfig.board]
      .filter(i => i.type !== 'AddWidget' && i.id !== slotId);

    setBoard(items);

    const newConfig = {...userConfig};
    newConfig.board = items;

    setUserConfig({...newConfig});
  };

  return (
    <>
      <div className="slots wrapper">
        {
          board.map((boardSlot) => (
            <div
              className="slot"
              key={boardSlot.id}
              name={boardSlot.type}
              onDragOver={handleDragOver}
              onDrop={() => handleOnDrop(boardSlot.id)}
            >
              <div
                className='clear-slot'
                onClick={() => handleClearSlot(boardSlot.id)}
              >
                <MinusOutlined />
              </div>
              { handleDisplayItems(boardSlot) }
              {
                boardSlot.type === 'AddSlot' &&
                <AddBoardSlot
                  class={'card view-only'}
                  handleAddSlot={() => handleAddSlot()}
                />
              }
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Wrapper;