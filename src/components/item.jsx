import { Button, Card, CardActions, CardContent, Dialog, TextareaAutosize, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Item(props){
    const [edit, setEdit] = useState(false);
    const [item,setItem] = useState();

    useEffect(()=>{
      setItem(props.item)
    },[])
    const change = ()=>{
        setEdit(!edit);
    }
    const handleChanges = (prop) => (event) => {
      setItem({ ...item, [prop]: event.target.value });
    };
    const updateData = () =>{
      axios.post("http://localhost:3001/job/update",{...item},{headers:{auth:localStorage.getItem("authtodo")}})
      .then(result=>{
        // console.log(result);
        // setEdit(undefined)
        // getItem();
        setEdit(!edit);
       })
        .catch(err=>{

         })
    }
    return(
        <div>
         <Card onDoubleClick={()=>change()}>                        
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
             {item?.head}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {item?.content}
          </Typography>
        
          </CardContent>
          <CardActions>
              <img src="http://localhost:3001/img/user.png" alt="Girl in a jacket" width="20" height="20" style={{borderRadius:"25px"}}/>
            </CardActions>
        </Card>


         {edit ? <Dialog onClose={()=>change()}  open={edit} >
            <Card sx={{width:"400px"}}>
              <Typography sx={{paddingLeft:"40px",paddingTop:"20px"}}>
                Content created by {item?.user?.fullname}
              </Typography>
              <br/>
                         <CardActions sx={{paddingLeft:"40px"}}>
                          
                            <form>
                              <TextField id="outlined-basic" value={item.head} label="head" variant="outlined" onChange={handleChanges('head')} sx={{border:"none"}}  /><br/><br/>
                              <TextField id="outlined-basic" value={item.content} label="Email" variant="outlined"  onChange={handleChanges('content')} sx={{border:"none",height:"100px"}} />
                             <br/> <Button onClick={()=>updateData()} >Save</Button>
                            </form>
                              
                          </CardActions>
                         </Card> 
                   </Dialog> :""}
        </div>
    )
}