const express = require('express');
const app = express();

app.get('/',(req, res)=>{
    res.send('<h1>Welcome to the node app</h1>')
});

app.listen(3100, ()=>{
    console.log("server running on port 3100");
})