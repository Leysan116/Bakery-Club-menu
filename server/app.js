const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const { NAME, PORT, DATABASE } = require('./config.js');

const DB = require('./modules/db/DB');
const db = new DB(DATABASE);

const User = require('./modules/users/User');

const users = [];

io.on('connection', async (socket) => {
    console.log('connected ', socket.id);

    const productList = await db.getAllProductsByTableName('cupcakes');
    socket.on('getProductList', () => {
        socket.emit('updateProductList', { productList: productList });
    })

    users.push(new User(socket.id));
    console.log(users);

    socket.on('addToBasket', (productName) => {
        users.forEach((user) => {
            if (socket.id === user.socketId) {
                if (user.products.indexOf(productName) == -1) {
                    user.products.push(productName);
                    console.log(user.products, user.socketId);
                }
            }
        });
    });

    socket.on('getBasketProducts', () => {
        users.forEach((user) => {
            if (socket.id === user.socketId) {
                let products = [];
                for (let i = 0; i < productList.length; i++) {
                    for (let j = 0; j < user.products.length; j++) {
                        if (productList[i].name === user.products[j])
                            products.push(productList[i]);
                    }
                }
                socket.emit('showBasketProducts', products);
            }
        });
    });


    socket.on('disconnect', () => {
        users.forEach((user, index) => {
            if (socket.id === user.socketId) {
                users.splice(index, 1);
            }
        });
        console.log(users);
    });
});

app.use(express.static('public'));

server.listen(PORT, () => console.log('все ок, работаем', NAME));

function deinitModules() {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}

process.on('SIGINT', deinitModules);
