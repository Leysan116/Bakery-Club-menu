import Menu from './menu/Menu';
import Basket from './basket/Baket';

function ScreenChanger(info) {
    const { screenName, setScreen, socket } = info;
    return (
        <div>
            {screenName === 'Menu' ?
                <Menu setScreen={setScreen} socket={socket} /> :
                screenName === 'Basket' ?
                    <Basket setScreen={setScreen} socket={socket} /> : <div />
            }
        </div>
    );

}

export default ScreenChanger;