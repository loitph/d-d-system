import './Hall.css';

import { useContext, useEffect, useState } from 'react';
import { ADD_WIDGET } from '../../constant/mockup';
import { StoreContext } from '../../contexts/Store.context';
import Greeting from '../Greeting/Greeting';
import ModeDisplay from '../ModeDisplay/ModeDisplay';
import AddWidget from '../AddWidget/AddWidget';

export default function Hall() {
  const { userConfig, setUserConfig } = useContext(StoreContext);
  const [ hallItems, setHallItems ] = useState([]);

  useEffect(() => {
    if (!userConfig?.id) {
      return;
    }

    let items = [...userConfig.widget].filter(i => i.type !== 'AddWidget');
    items.push(ADD_WIDGET);

    setHallItems(items);
  }, [userConfig]);

  return (
    <>
      <div className="hall" onDragOver={(e) => {e.preventDefault()}}>
        {
          hallItems.map(item => {
            switch (item.type) {
              case 'Greeting':
                return <Greeting key={item.id} data={item} class={'card view-only'} />;
              case 'ModeDisplay':
                return <ModeDisplay key={item.id} data={item} class={'card view-only'} />;
              case 'AddWidget':
                return <AddWidget key={item.id} data={item} class={'card view-only'} />;
            }
          })
        }
      </div>
    </>
  );
}