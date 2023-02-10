import { type FC, useState, useEffect } from 'react';
import { GASClient } from 'gas-client';
import type * as server from '../server/Main';
import './App.css';

const { serverFunctions } = new GASClient<typeof server>();

const App: FC = () => {
  const [count, setCount] = useState(0);
  // communicate to spreadsheet
  const handleButtonClick = async () => {
    console.log(`affect value ${count} to SpreadSheet A1 cell!`);
    await serverFunctions.affectCountToA1(count);
  };

  const [data, setData] = useState<string>('');
  const handleGetDataFromGAS = async () => {
    interface User {
      username: string;
      password: string;
      isLocal: number;
      schoolCode: string;
      schoolName: string;
      familyName: string;
      givenName: string;
      familyKanaName: string;
      givenKanaName: string;
      renewName: string;
      renewPassword: string;
      renewClass: string;
      termName: string;
      className: string;
      classRole: string;
      TekitouName: string;
    }
    const ret = (await serverFunctions.getDataFromGAS()) as string;
    console.log('OK!!!!');
    console.log(`return? ${ret}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = JSON.parse(ret);
    console.log('obj:');
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const users: User[] = obj.result;
    setData(users[0].TekitouName);
  };

  const [title, setTitle] = useState<string | null>('');
  useEffect(() => {
    const getTitle = async () => {
      const [spreadsheettitle, FormElements] = await Promise.all([
        serverFunctions.getSpreadSheetName(),
        serverFunctions.PrepareForm(),
      ]);
      console.log(`get spread sheet title: ${spreadsheettitle ?? '(null)'}`);
      setTitle(spreadsheettitle);
      console.log('got form data!');
      console.log(FormElements, FormElements.Students);
    };
    void getTitle();
  }, []);

  return (
    <div className="App">
      <h1>{title !== '' ? title : 'Vite + React on GAS'}</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count: number) => count + 1);
          }}
        >
          count is {count}
        </button>
        <div className="card">
          <button
            onClick={async () => {
              await handleButtonClick();
            }}
          >
            SpreadSheetにカウントを反映する
          </button>
        </div>
        <div className="card">
          <button
            onClick={async () => {
              await handleGetDataFromGAS();
              console.log('done');
            }}
          >
            SpreadSheetからFormを構成するデータを取得する
          </button>
        </div>
        <div>{data ?? 'OK'}</div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
};

export default App;
