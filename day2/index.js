import express from 'express';
import { users } from './data.js';
import crypto from 'crypto'
const app = express();
app.use(express.json());

app.get('', (req, res) => {
    res.send({
        message: "Hello MindX!"
    })
})

app.get('/users/:id', (req, res) => {
    // step get id on params url
    const { id } = req.params;
    const found = users.find((item) => {
        return item.id === id;
    });
    res.send({
        message: found ? 'Thanh Cong!' : 'That Bai!',
        data: found ?? null
    });
});

app.post('/user', (req, res) => {
    const newData = req.body;

    if (!newData.email) {
        res.send({
            message: 'Bạn chưa cung cấp email!',
            data: null
        });
        return;
    } else {
        // kiểm tra email đã tồn tại hay chưa?
        const crrUser = users.find(item => item.email === newData.email);
        if (crrUser) {
            res.send({
                message: 'Email đã tồn tại!',
                data: null
            });
            return;
        }
    }

    const newId = crypto.randomUUID();
    
    const newUser = {
        ...newData,
        id: newId
    }

    users.push(newUser)

    res.send({
        message: 'Thanh Cong',
        data: users
    })
});

app.listen(8180, () => {
    console.log('Server is running!');
});