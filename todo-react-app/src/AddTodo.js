import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

const AddTodo = (props) => {
    //Todo의 정보를 저장할 수 있는 state 
    const [item, setItem] = useState({title : ""});
    //새로운 객체를 배열에 추가해주는 메서드 
    const addItem = props.addItem;

    //onButtonClick함수 작성
    const onButtonClick = () =>{
        addItem(item)
        setItem({title:""})
    }

    //onInputChange 함수 작성
    //입력이 감지될 때 마다 실행되는 함수 
    const onInputChange = (e) => {
        setItem({title : e.target.value});
        console.log(item);
    }

    //enterkeyEventHandler 함수 
    const enterkeyEventHandler =(e)=>{
        if(e.key == 'Enter'){
            onButtonClick();
        }
    }

    return(
        <Grid container sytle={{marginTop:20}}>
            <Grid xs={11} md={11} item style={{paddingRight:16}}>
                <TextField placeholder="Add Todo Here" fullWidth onChange={onInputChange} onKeyDown={enterkeyEventHandler} value={item.title}/>
            </Grid>
            <Grid xs={1} md={1} item>
                <Button fullWidth style={{height : '100%'}} color="secondary" variant="outlined" onClick={onButtonClick}>
                    +
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddTodo;