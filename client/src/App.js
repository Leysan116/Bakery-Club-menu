import './App.css';
import ScreenChanger from './components/ScreenChanger';
import { useState } from 'react';
import io from "socket.io-client";
import DeviceOrientation, { Orientation } from 'react-screen-orientation';

const socket = io.connect("http://localhost:4200/", {
  reconnection: true
});

function App() {
  const [screenName, setScreen] = useState('Menu');
  return (
    <div className="App">
      <DeviceOrientation lockOrientation={'landscape'}>
        <Orientation orientation='landscape' alwaysRender={false}>
          <p style={{marginTop:'49vh'}}>Переверните свой телефон</p>
        </Orientation>
        <Orientation orientation='portrait' alwaysRender={false}>
          <ScreenChanger screenName={screenName} socket={socket} setScreen={setScreen} />
        </Orientation>
      </DeviceOrientation>

    </div>
  );
}

export default App;
