import  React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Login(props){
    const [value, setValue] = React.useState(0);
    const [msg, setMsg] = React.useState(0);
    let navigate = useNavigate();
    const [values, setValues] = React.useState({
      password: undefined,
      fullname:undefined,
      email:undefined,
      showPassword: false,
    });

    useEffect(()=>{
      if(localStorage.getItem("authtodo")){
        navigate("/home")
      }
    })


    const login = () =>{
      if(!values.password || !values.email ){
        setMsg("we need your email and password")
        return;
      }
      setMsg(undefined)
      axios.post("http://65.2.125.131:3001/user",{status:2})
      .then(result=>{
        if(result.data.status){
          localStorage.setItem("authtodo",result.data.token)
          navigate("/home");
      }
      })
      .catch(err=>{
      } )  
    }
    const register = ()=>{  
      if(!values.password || !values.fullname || !values.email ){
        setMsg("we need your email and password")
        return;
      }
      setMsg(undefined)

      axios.post("http://65.2.125.131:3001/user/register",{fullname:values.fullname,email:values.email,password:values.password})
      .then(result=>{
     
          if(result.data.status){
              localStorage.setItem("authtodo",result.data.token)
              navigate("/home");
          }
      })
      .catch(err=>{
      } )  
    }

    const setData = ()=>{

    }
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChanges = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    return(<div style={{display:"flex",justifyContent:"flex-end",marginTop:"120px",marginRight:"100px"}}>
        <Card sx={{width:"600px",height:"500px",borderRadius:"25px",paddingTop:"30px"}}> 
            <Box sx={{ width: '100%' ,width:"500px",height:"300px",paddingLeft:"50px"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Log In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
               
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            {msg ? <div>
                     <h4>
                         To Continue
                          {msg}
                      </h4>
                    </div>:""}
                <form>

                <TextField id="outlined-basic" label="Email" variant="outlined"  sx={{width:"400px"}}/><br/><br/>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" sx={{width:"400px"}}>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChanges('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                 </FormControl>

                    <br/>
                    <br/>
                    <Button style={{backgroundColor:"#48b4e0	",color:"white",width:"400px" }} onClick={()=>login()}> Log In</Button>
                </form>
                <br></br>
                <Checkbox sx={{backgroundColor:"#48b4e0"}}></Checkbox>Remember me
            </TabPanel>
            <TabPanel value={value} index={1}>
                   {msg ? <div>
                     <h4>
                         To Continue

                      </h4>
                    </div>:""}
            <form>
                    
                 
                  <TextField type="text" value={values.fullname}   onChange={handleChanges('fullname')} id="outlined-basic" label="Full Name" variant="outlined"  sx={{width:"400px"}}/><br/><br/>
                  <TextField  type="email" value={values.email} onChange={handleChanges('email')} type="text"  id="outlined-basic" label="Email" variant="outlined"  sx={{width:"400px"}}/><br/><br/>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" sx={{width:"400px"}}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChanges('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                      <br/>
                      <br/>
                      <Button style={{backgroundColor:"#48b4e0	",color:"white",width:"400px" }} onClick={()=>register()}> Sign Up</Button>
                  </form>
                  <br/>
                  <Checkbox sx={{backgroundColor:"#48b4e0"}}></Checkbox>Remember me
                  
            </TabPanel> 
            
        </Box>
      </Card>
      </div>
    )
}  




