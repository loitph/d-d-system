import { useContext, useEffect, useState } from 'react';
import './ModeDisplay.css';
import Mover from '../Mover/Mover';
import { Switch } from 'antd';
import { StoreContext } from '../../contexts/Store.context';

const ModeDisplay = (props) => {
  const [ injectClass, setInjectClass ] = useState(props.class);
  const [ modeDisplay, setModeDisplay ] = useState(props.data);
  const [ isViewOnly, setIsViewOnly ] = useState(true);

  const {
    userConfig, setUserConfig,
    showDialogWidget, setShowDialogWidget,
    widgetAdjust, setWidgetAdjust,
  } = useContext(StoreContext);

  const handleOnChange = (value) => {
    const config = {...userConfig};

    const item = config.widget.find(i => i.id === modeDisplay.id);
    item.value = value;

    if (document.body.classList.contains('light-mode')) {
      if (value === 'dark') {
        document.body.classList.remove('light-mode');
      }
    } else {
      if (value === 'light') {
        document.body.classList.add('light-mode');
      }
    }
    setModeDisplay(item);
    setUserConfig(config);
  };

  const onDeleteHandler = (param) => {
    const config = {...userConfig};
    const widgets = config.widget.filter(i => i.id !== param.id);

    config.widget = [...widgets];

    setUserConfig({...config});
  };

  const onEditHandler = (param) => {
    setShowDialogWidget(true);
    setWidgetAdjust(param);
  };

  useEffect(() => {
    setIsViewOnly(injectClass.split(' ').find(i => i === 'view-only'));
  }, [injectClass]);

  return (
    <>
      {
        isViewOnly &&
        <Mover
          classChild={injectClass + ` mode-display-container`}
          data={modeDisplay}
          onDeleteHandler={() => onDeleteHandler(modeDisplay)}
          moverTitle={`id: ${modeDisplay.id}`}
          noIcon={props.noIcon}
          onEditHandler={() => onEditHandler(modeDisplay)}
        >
          <Switch
            checkedChildren="Light mode"
            unCheckedChildren="Dark mode"
            defaultChecked={false}
            disabled
          />
        </Mover>
      }
      {
        !isViewOnly &&
        <Mover
          classChild={injectClass + ` mode-display-container`}
          data={modeDisplay}
          moverTitle={`id: ${modeDisplay.id}`}
          onDeleteHandler={() => props.onDeleteVisibleItem()}
          noIcon={props.noIcon}
        >
          <Switch
            checkedChildren="Light mode"
            unCheckedChildren="Dark mode"
            checked={modeDisplay.value === 'light' ? true : false}
            onChange={() => handleOnChange(modeDisplay.value === 'light' ? 'dark' : 'light')}
          />
        </Mover>
      }
    </>
  );
};

export default ModeDisplay;
