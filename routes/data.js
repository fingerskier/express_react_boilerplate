const Data = {}


const handler = (ws,req)=>{
  const {key} = req.params
  
  
  ws.on('message', msg=>{
    Data[key] = {...Data[key], msg}
    
    ws.send(Data[key])
  })
  
  
  ws.send(Data[key])
}


module.exports = handler