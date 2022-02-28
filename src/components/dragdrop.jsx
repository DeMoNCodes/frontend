import { Button, Card, CardActions, CardContent, CardHeader, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import Item from "./item";
import axios from "axios";







const columnsFromBackend = {
  todo: {
    name: "To do",
    items: []
  },
  inp: {
    name: "In Progress",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
  let  _id = columns[result.source.droppableId].items.filter(e=>e.id==result.draggableId);
  let ar = {"todo":0,"inp":1,"done":2}
  let status = ar[result.destination.droppableId];
  console.log(_id);
  
  axios.post("http://65.2.125.131:3001/job/update",{..._id[0],status},{headers:{auth:localStorage.getItem("authtodo")}})
  .then(result=>{
    // console.log(result);
    // setEdit(undefined)
    // getItem();

   })
    .catch(err=>{

     })
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function DragDrop() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [edit, setEdit] = useState();
  const [todo, setTodo] = useState();
  const [inp, setInp] = useState();
  const [done, setDone] = useState();
  const isInitialMount = useRef(true);
  
  const [values,setValue] = useState({
    head:undefined,
    content:undefined
  });
  const addItem = (c)=>{
    // console.log(c);
    
      setEdit(c);
  }
 

  useEffect(()=>{
          


    getItem();
  },[])

  const handleChanges = (prop) => (event) => {
    setValue({ ...values, [prop]: event.target.value });
  };
  
  const save = (name) =>{
    let ar = {"To do":0,"In Progress":1,"Done":2}
    let status = ar[name];
    axios.post("http://65.2.125.131:3001/job/create",{...values,status},{headers:{auth:localStorage.getItem("authtodo")}})
    .then(result=>{
        // console.log(result);
        setEdit(undefined)
        getItem();
    })
    .catch(err=>{

    })
  }

  const getItem = () =>{
    let todo =[];
    let inp = [];
    let done =  [];
    axios.post("http://65.2.125.131:3001/job",{status:0})
    .then(result=>{
      let count = 0;
      result.data.doc.map(e=>{
        e.id =  uuidv4();
        count++;
      })
      todo =  result.data.doc;   

      axios.post("http://65.2.125.131:3001/job",{status:1})
      .then(result=>{
        let count = 0;
        result?.data?.doc.map(e=>{
          e.id =  uuidv4();
          count++;
        })
        inp =  result.data.doc;   
          // setColumns({...columns,inp:inp.inp});
          axios.post("http://65.2.125.131:3001/job",{status:2})
          .then(result=>{
            let count = 0;
            result?.data?.doc.map(e=>{
              e.id =  uuidv4();
              count++;
            })
            done = result.data.doc; 
            let hh ={
              todo: {
                name: "To do",
                items: todo
              },
              inp: {
                name: "In Progress",
                items: inp
              },
              done: {
                name: "Done",
                items: done
              }
            }    
            setColumns(hh)
            console.log(columns);

          })
          .catch(err=>{
            
          })
      })
      .catch(err=>{
        
      })
      
       
    })
    .catch(err=>{

    })
   
   


    

  }
  // getItem();
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
    
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
             
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "white"
                            : "white",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",
                          transition:"0.3s"
                        }}
                      >
                           <h5>{column.name}</h5>
                         <Button sx={{width:"240px"}} onClick={()=>addItem(column.name)}><AddIcon></AddIcon></Button>
                         
                        { edit==column.name ?  <Card>
                         <CardActions>
                            <form>
                              <TextField id="outlined-basic" label="head"  onChange={handleChanges('head')} variant="outlined" sx={{border:"none"}}  /><br/><br/>
                              <TextField id="outlined-basic" onChange={handleChanges('content')}  label="content" variant="outlined"  sx={{border:"none",height:"100px"}} />
                              <Button onClick={()=>save(column.name)}>Save</Button>
                            </form>
                              
                          </CardActions>
                         </Card> :"" }
                        {column.items.map((item, index) => {
                          return (
                            
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                             
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    
                                  >
                                   <Item item={item}></Item>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default DragDrop;
