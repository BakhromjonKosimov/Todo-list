import axios from "axios";

export const postData = async (id,name,url) => {
    const newPost = {
        user: id,
        title: name,
    };

    try {
        await axios.post(url, newPost);
    } catch (err) {
        console.error("Post methodida xatolik bor");
    }
}


export const deleteTasks = async (id,url) => {
    try {
        await axios.delete(url+id);        
    } catch (err) {
        console.error("Delete methodida xatolik bor");
    }
}


export const putTasks = async (id,url) => {
   
    try {
        await axios.put(url+id);        
    } catch (err) {
        console.error("Put methodida xatolik bor");
    }
}