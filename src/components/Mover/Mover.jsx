import { useContext } from 'react';
import './Mover.css';
import { StoreContext } from '../../contexts/Store.context';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Mover = (props) => {
  const { widgetDragged, setWidgetDragged } = useContext(StoreContext);

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDragStart = (paramData) => {
    setWidgetDragged(paramData);
  };

  return (
    <>
      <div
        className={props.classChild + ' mover-container'}
        draggable
        onDragStart={() => handleDragStart(props.data)}
        onDragOver={handleDragOver}
      >
        <div className='mover-title'>
          <p>{props.moverTitle}</p>
          <div className='btn-mover-adjust'>
            {
              !props.noIcon &&
              props.onEditHandler &&
              <EditOutlined
                className='btn-mover-edit'
                onClick={props.onEditHandler}
              />
            }
            {
              !props.noIcon &&
              props.onDeleteHandler &&
              <DeleteOutlined
                className='btn-mover-delete'
                onClick={props.onDeleteHandler}
              />
            }
            
          </div>
        </div>
        <div className='mover-content'>
          {props.children}
        </div>
        <div className='mover-footer'></div>
      </div>
    </>
  );
};

export default Mover;
