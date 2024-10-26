import { PlusOutlined } from '@ant-design/icons';
import './AddBoardSlot.css';

const AddBoardSlot = (props) => {
  return (
    <>
      <div
        className={props.class + ' add-widget-container'}
        onClick={props.handleAddSlot}
      >
        <PlusOutlined />
      </div>
    </>
  );
};

export default AddBoardSlot;
