import { useState } from "react";
import { StorageProvider } from "../../contexts/Storage.context";
import Hall from "../Hall/Hall";
import Wrapper from "../Wrapper/Wrapper";

import './Dashboard.css'

const Dashboard = () => {
  const [ order, setOrder ] = useState({
    curr: '',
    target: '',
    data: null
  });

  const handleOrder = (paramOrder) => {
    setOrder(paramOrder);
  };

  return (
    <>
      <div className='dashboard'>
        <StorageProvider>
          <Wrapper onSendOrder={handleOrder} />
          <Hall receiveOrder={order} />
        </StorageProvider>
      </div>
    </>
  );
};

export default Dashboard;