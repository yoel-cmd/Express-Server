import express from "express"

const X_API_KEY="live_dFEf9Bq05rrBSsi09oqnkHaDugJ03lSKk5DNdv4WhtHFHdz0zSK5AAGeNTy1udeo"
const server = express()

const PORT = 8200

server.use(express.json())

function logger(req, res, next) {
    console.log(`the methode${req.method} url: ${req.url}`);
    next()
}

server.use(logger)
const js = {
    msg: 'hi',
    timestamp: new Date().toLocaleTimeString()
}

server.get('/greet', (req, res) => {
    res.json(js)
})
server.get('/greet/:name', (req, res) => {
    const name = req.params.name
    res.send(`i got name: ${name}`);

})

server.get('/test', (req, res) => {
    fetch('http://localhost:8200/greet/yoel')
        .then(response => response.text())
        .then(data => {
            if (data === 'i got name: yoel') {
                res.send('ok')
            }
            else {
                res.send('not')
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });

})

server.post('/action', async(req, res) => {

    if (req.body.action === 'joke') {
        try{
         const response = await fetch('https://official-joke-api.appspot.com/random_joke');
         const data = await response.json();
         const joke = `${data.setup} ${data.punchline}`.toUpperCase();
         res.json({ joke: joke });
        }catch(err){
            console.error('err',err.msg)
            res.send({ error: 'Internal server error' });
        }
    } else if (req.body.action === 'cat fact') {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11',{headers:{
            'x-api-key':X_API_KEY
        }})
        const data = await response.json()
        res.json({"length":data.length})
        
    } else {
        res.status(400)
        res.send({'msg':'body is not malformed'})
    }

})


server.listen(PORT, () => {
    console.log(`listen... port ${PORT}`);
    
    
})