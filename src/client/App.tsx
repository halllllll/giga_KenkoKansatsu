import { type FC, useState, useEffect } from 'react';
import { Container, Button } from '@chakra-ui/react';
import { GASClient } from 'gas-client';
import type * as server from '../server/Main';
import './App.css';
import Header from './components/Header';
import Info from './components/Info';

const { serverFunctions } = new GASClient<typeof server>();

const App: FC = () => {
  const [count, setCount] = useState(0);
  // communicate to spreadsheet
  const handleButtonClick = async () => {
    console.log(`affect value ${count} to SpreadSheet A1 cell!`);
    await serverFunctions.affectCountToA1(count);
  };

  const [title, setTitle] = useState<string>(document.title);
  // 取得する時間にかなり差があるので別々に取得するためにuseEffectをわけた
  useEffect(() => {
    const knock = async () => {
      const [FormElements] = await Promise.all([serverFunctions.PrepareForm()]);
      console.log('got form data!');
      console.log(FormElements, FormElements.Students);
    };
    void knock();
  }, []);

  useEffect(() => {
    const knock = async () => {
      const spreadsheettitle = await serverFunctions.getSpreadSheetName();
      console.log(`get spread sheet title: ${spreadsheettitle ?? '(null)'}`);
      setTitle(spreadsheettitle);
    };
    void knock();
  }, []);

  return (
    <div className="App">
      <Header headerTitle={title} />
      <Container>
        {/** TODO: information area */}
        <Info message={''} hasUrl={false} url={''} />
        <Button
          onClick={() => {
            setCount((count: number) => count + 1);
          }}
        >
          count is {count}
        </Button>
        <Button
          onClick={async () => {
            await handleButtonClick();
          }}
        >
          SpreadSheetにカウントを反映する
        </Button>
      </Container>
    </div>
  );
};

export default App;
