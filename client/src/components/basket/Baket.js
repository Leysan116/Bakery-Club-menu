import { useState } from "react";

export default function Basket(info) {
    const { setScreen, socket } = info;


    const [productList, setProductList] = useState(() => {
        socket.emit('getBasketProducts');
        socket.emit('getAllProducts');
        return (<div />)
    });

    socket.on('showBasketProducts', showBasketProducts);

    function showBasketProducts(data) {
        setProductList(<ProductList products={data} />);
    }

    function ProductList(data) {
        const { products } = data;
        return (
            <div>{products.map(({ name, price, imageLink }) => (
                <div key={name}>
                    <img className="productImage" src={imageLink} />
                    <p >{name}: {price} р.</p>
                </div>
            )
            )}
            </div>
        );
    }

    return (
        <div>
            <p className="title">Корзина</p>
            {productList}
            <button onClick={() => { setScreen('Menu') }}>Вернуться</button>
        </div>
    )
}