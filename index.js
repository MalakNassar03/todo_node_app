const express=require('express')
const app=express(); // object ff express
app.use(express.json()); //when ever i have a req ores have it in json format
//this is is a middleware it process the req and res before forwarding them
const port=3000;
let todos=[
    {
        id:1,
        text:"learn node",
        completed:false
    },
    {
        id:2,
        text:"learn express",
        completed:false
    }
]
//route)entry point for the application
app.get('/',(req,res)=>{
    res.json(todos)
})
app.get('/todos',(req,res)=>{
    res.json(todos)
})
app.post('/todos',(req,res)=>{
    const new_task={
        id:todos.length+1,// count
        text:req.body.text,
        completed:req.body.completed||false
    }
    todos.push(new_task);
    res.status(201).json(todos);
})
app.put('/todos',(req,res)=>{
    const {id,task,completed}=req.body;
    const todo=todos.find(t=>t.id===parseInt(id));
    if(!todo) return res.status(404).send("todo not found")
    todo.text=task || todo.text
    todo.completed=completed !==undefined ? completed: todo.completed
    res.json(todos);

})
app.delete('/todos/:id',(req,res)=>{
    const index=todos.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1) return res.status(404).send("todo not found")
    todos.splice(index,1);
    res.status(204).send()
})
app.get('/todos/:id',(req,res)=>{
   const id=parseInt(req.params.id);//convert string to int
   const todo=todos.find(todo=>todo.id===id);
    if(!todo){
        return res.status(404).send("not found")
    }
   res.json(todo);//the res

})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


//whenevere we turn off the server the newly added  data will be lost due to teh lack of db therefore we need to create a data base