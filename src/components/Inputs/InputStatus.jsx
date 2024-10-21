import { useStorage } from "../../contexts/Storage.context";


const InputStatus = () => {
  const { storage, updateStorage } = useStorage();

  const inputSttStorage = () => {
    const data = storage;

    console.log('[L] > storage before: ', storage);

    data.status = 'completed';
    updateStorage(data);
  }

  return (
    <>
      <div>
        <p>Input status</p>
        <button onClick={inputSttStorage}>Input status</button>
      </div>
    </>
  );
};

export default InputStatus;