import http from 'http';

const app = http.createServer((request, response) => {
    const listStudent = [
        {
            id: 1,
            fullName: "Jackie",
            age: 5,
            class: "5A"
        },
        {
            id: 2,
            fullName: "Juli MTP",
            age: 53,
            class: "5A"
        },
        {
            id: 3,
            fullName: "Denis",
            age: 5,
            class: "5B"
        },
    ]
    const endpoint = request.url;
    const method = request.method;
    switch (endpoint) {
        case '/':
            response.end(`Hello MindX`);
            break;
        case '/user':
            response.end(JSON.stringify(listStudent));
            break;
        case '/user/old':
            if (method === "GET"){
                const old = listStudent.filter(user => user.age >= 50);
                response.end(JSON.stringify(old));
            }
            break
        case '/user/add-random':
            function getRandomElement(array) {
                const randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            response.end(JSON.stringify(getRandomElement(listStudent)));
            break;
        
        default:
            response.end(`404 Notfound`);
            break;
    }
});

app.listen(8080, () => {
    console.log('Server is running!');
});