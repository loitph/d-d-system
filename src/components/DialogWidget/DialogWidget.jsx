import { useContext, useEffect, useState } from 'react';
import './DialogWidget.css';
import { StoreContext } from '../../contexts/Store.context';
import { CloseOutlined } from '@ant-design/icons';
import { TYPES } from '../../constant/mockup';
import Greeting from '../Greeting/Greeting';
import ModeDisplay from '../ModeDisplay/ModeDisplay';

const DialogWidget = () => {
  const {
    showDialogWidget, setShowDialogWidget,
    userConfig, setUserConfig,
    widgetAdjust, setWidgetAdjust,
  } = useContext(StoreContext);

  const [ newWidget, setNewWidget ] = useState({});

  const [ types, setTypes ] = useState([]);
  const [ type, setType ] = useState('Greeting');

  const handleOnClose = () => {
    setShowDialogWidget(false);
    setType('Greeting');
    setWidgetAdjust({
      id: '',
      slot: '',
      value: '',
      type: ''
    });
  };

  const initNewWidget = () => {
    const sizeWidget = userConfig.widget.length;

    const newWidgetId = crypto.randomUUID();
    const newSlot = sizeWidget + 1;

    const data = {
      id: newWidgetId,
      slot: 's' + newSlot,
      value: '',
      type: ''
    };

    setNewWidget(data);
  };

  const handleOnSave = () => {
    let newConfig = {...userConfig};
    let newData = {...newWidget};

    if (widgetAdjust?.id) {
      newData = {...widgetAdjust};
    }

    switch(type) {
      case 'Greeting':
        newData.type = 'Greeting';
        newData.value = '';
        break;
      case 'ModeDisplay':
        newData.type = 'ModeDisplay';
        newData.value = 'dark';
        break;
    }

    if (!widgetAdjust?.id) {
      newConfig.widget.push({...newData});
      setUserConfig({...newConfig});
    } else {
      newConfig.widget = newConfig.widget.map(i => {
        if (i.id === newData.id) {
          return newData;
        } else {
          return i;
        }
      })

      setUserConfig({...newConfig});
    }

    handleOnClose();
  };

  const handleOnChangeType = (value) => {
    setType(value);

    if (widgetAdjust?.id) {
      switch(value) {
        case 'Greeting':
          widgetAdjust.value = '';
          break;
        case 'ModeDisplay':
          widgetAdjust.value = 'dark';
          break;
      }

      setWidgetAdjust({...widgetAdjust});
    }
  };

  useEffect(() => {
    setTypes(TYPES);
  }, []);

  useEffect(() => {
    if (!userConfig.id) {
      return;
    }

    initNewWidget();
  }, [userConfig]);

  useEffect(() => {
    setType(widgetAdjust?.id ? widgetAdjust.type : 'Greeting');
  }, [showDialogWidget]);

  return (
    <>
      {
        showDialogWidget && (
        <div className='dialog-widget-container'>
          <div className='dialog-mask'></div>
          <div className='dialog-content'>
            <div className='dialog-header'>
              <h3>Create Widget</h3>
              <CloseOutlined onClick={handleOnClose} />
            </div>
            <div className='dialog-main'>

              <div className='widget-form'>
                <div className='section type'>
                  <label htmlFor="type">Widget type:</label>
                  <select
                    className='type'
                    name='type'
                    value={type}
                    onChange={(e) => handleOnChangeType(e.target.value)}
                  >
                    {types.map(type => (
                      <option key={type.id} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className='section type-value'>
                  {
                    type === '' ||
                    type === 'Greeting' &&
                    <Greeting data={widgetAdjust.id !== '' ? widgetAdjust : newWidget} class={'card preview-only'} noIcon={true} />
                  }
                  {
                    type === 'ModeDisplay' &&
                    <ModeDisplay data={widgetAdjust.id !== '' ? widgetAdjust : newWidget} class={'card preview-only'} noIcon={true} />
                  }
                </div>
              </div>
              
            </div>
            <div className='dialog-footer'>
              <button
                className='btn btn-cancel'
                onClick={handleOnClose}
              >
                Cancel
              </button>
              <button
                className='btn btn-save'
                onClick={handleOnSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};

export default DialogWidget;
