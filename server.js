import express from "express"

const server=express()

const PORT=8200



const js={
    msg:'hi',
    timestamp:new Date().toLocaleTimeString()
}

server.get('/greet',(req,res)=>{
    res.json(js)
})




server.listen(PORT,()=>{
    console.log(`listen... port ${PORT}`);
    
})