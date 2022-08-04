import React, { useState, useEffect, useRef } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './TodoList.css'
import axios from "axios";
import { postData, deleteTasks, putTasks } from './useAxios';


function TodoList() {
    const url = 'https://todosila.pythonanywhere.com/tasks/';
    const nameInputRef = useRef(null);
    const [err, setErr] = useState(false);
    const [data, setData] = useState([]);

    const sendPost = () => {
        if (nameInputRef.current.value !== "") {
            postData(1, nameInputRef.current.value, url);
            nameInputRef.current.value = "";
            setErr(false);
        } else {
            setErr(true);
        }
    };

    const getTasks = async () => {
        try {
            const resp = await axios.get(url);
            setData(resp.data);

        } catch (err) {
            console.error("Post methodida xatolik bor");
        }
    }


    const deleteTask = (id) => {
        deleteTasks(id, url);
    }

    const putTask = (id, name) => {
        nameInputRef.current.value = name;
        putTasks(id, url);
    }


    useEffect(() => {
        getTasks();
    }, [data]);


    return (
        <div>
            <Container maxWidth="sm">
                <div className='wrapper'>
                    <h1>Welcome!</h1>                  
                        <form className="input-sectioin" onSubmit={sendPost}>
                            <TextField className='text-area' inputRef={nameInputRef} id="outlined" variant="outlined" error={err} />
                            <Button variant="outlined"
                                onClick={sendPost}   >
                                Post
                            </Button>
                        </form>
                 


                    <div className='cards'>
                        {data.map(item => {
                            return <Stack key={item.id} direction="row" spacing={2} className="every-card">
                                <div className='information'> {item.title}</div>
                                <Button variant="primary"
                                    onClick={() => putTask(item?.id, item?.title)}
                                >
                                    Edit
                                </Button>
                                <IconButton aria-label="delete" size="large"
                                    onClick={() => deleteTask(item?.id)}
                                >
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        })}
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default TodoList;