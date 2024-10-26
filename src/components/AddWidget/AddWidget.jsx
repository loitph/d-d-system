import { PlusOutlined } from '@ant-design/icons';
import './AddWidget.css';
import { useContext, useState } from 'react';
import { StoreContext } from '../../contexts/Store.context';

const AddWidget = (props) => {
  const [ injectClass, setInjectClass ] = useState(props.class);
  const { showDialogWidget, setShowDialogWidget } = useContext(StoreContext);

  return (
    <>
      <div
        className={injectClass + ' add-widget-container'}
        onClick={() => setShowDialogWidget(true)}
      >
        <PlusOutlined />
      </div>
    </>
  );
};

export default AddWidget;
