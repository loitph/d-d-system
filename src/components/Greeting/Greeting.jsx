import { useContext, useEffect, useState } from 'react';
import './Greeting.css';
import { StoreContext } from '../../contexts/Store.context';
import Mover from '../Mover/Mover';

const Greeting = (props) => {
  const [ injectClass, setInjectClass ] = useState(props.class);
  const [ greetingData, setGreetingData ] = useState(props.data);
  const [ isViewOnly, setIsViewOnly ] = useState(true);

  const {
    userConfig, setUserConfig,
    showDialogWidget, setShowDialogWidget,
    widgetAdjust, setWidgetAdjust,
  } = useContext(StoreContext);

  const handleOnChange = (value) => {
    const config = {...userConfig};

    const item = config.widget.find(i => i.id === greetingData.id);
    item.value = value;

    setGreetingData(item);
    setUserConfig(config);
  };

  const onDeleteHandler = (param) => {
    const config = {...userConfig};
    const widgets = config.widget.filter(i => i.id !== param.id);

    config.widget = [...widgets];

    setUserConfig({...config});
  };

  const onEditHandler = (param) => {
    setWidgetAdjust(param);
    setShowDialogWidget(true);
    setGreetingData(param);
  };

  useEffect(() => {
    setIsViewOnly(injectClass.split(' ').find(i => i === 'view-only'));
  }, [injectClass]);

  return (
    <>
      {
        isViewOnly &&
        <Mover
          classChild={injectClass + ` greeting-container`}
          data={greetingData}
          onDeleteHandler={() => onDeleteHandler(greetingData)}
          moverTitle={`id: ${greetingData.id}`}
          onEditHandler={() => onEditHandler(greetingData)}
        >
          <input
            type="text"
            name='greeting-message'
            placeholder='Greeting message'
          />
        </Mover>
      }
      {
        !isViewOnly &&
        <Mover
          classChild={injectClass + ` greeting-container`}
          data={greetingData}
          moverTitle={`id: ${greetingData.id}`}
          onDeleteHandler={() => props.onDeleteVisibleItem()}
          noIcon={props.noIcon}
        >
          <input
            type="text"
            name='greeting-message'
            placeholder='Greeting message'
            value={greetingData.value}
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </Mover>
      }
    </>
  );
};

export default Greeting;
