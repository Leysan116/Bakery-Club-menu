import { useState, createRef } from "react";
import arrow from '../../assets/arrow.png';
import './menu.css';

function Menu(info) {

    const { setScreen, socket } = info;

    socket.on('updateProductList', updateProductList);

    const categoryName = ['Кексы'];

    const [products, updateProducts] = useState(null);
    const [switcher, setSwitcher] = useState(() => {
        socket.emit('getProductList', categoryName[0]);
        return (<div />)
    });

    const productNameRef = createRef();

    function Switcher() {

        const [indexProduct, changeIndexProduct] = useState(1);

        function switchProduct(side) {

            if (side === 'right') changeIndexProduct(indexProduct + 1);

            if (side === 'left') changeIndexProduct(indexProduct - 1);

            if (indexProduct === 0 && side === 'left') changeIndexProduct(products.length - 1);

            if (indexProduct === products.length - 1 && side === 'right') changeIndexProduct(0);
        }

        if (products)
            return (
                <div>
                    <div className="switcherContainer">
                        <button className="arrowBtn" onClick={() => { switchProduct('left') }}><img className="arrow leftArrow" src={arrow} /></button>
                        <img className="productImage" src={products[indexProduct].imageLink} />
                        <button className="arrowBtn" onClick={() => { switchProduct('right') }}><img className="arrow" src={arrow} /></button>
                        <p ref={productNameRef}>{products[indexProduct].name}</p>
                        <p>{products[indexProduct].price} р.</p>
                    </div>
                    <div>
                        <button className="addToBasketBtn" onClick={() => {
                            socket.emit('addToBasket', productNameRef.current.textContent);

                        }}>Добавить</button>
                    </div>
                </div>
            );
    }

    function updateProductList(data) {
        const { productList } = data;
        updateProducts(productList);
        setSwitcher(<Switcher />)
    }

    return (
        <div>
            <div style={{ position: 'fixed', width: '100vw' }}>
                <p className="title" >Меню</p>
            </div>

            <div style={{ width: '100vw' }}>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <div>
                        {switcher}
                    </div>
                </div>
            </div>
            <div className="basketDiv" >
                <button className="setBasketBtn" onClick={() => { setScreen('Basket') }}>Корзина</button>
            </div>
        </div >
    );
}

export default Menu;