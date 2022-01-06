import { useState, useEffect } from 'react'
import { AiFillCloseCircle } from'react-icons/ai'
import axios from 'axios';
import { IconContext } from 'react-icons/lib';

function Editor({data, openEditor}) {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        if (data)
        {
            setTitle(data.title);
            setNote(data.note);
        }
        return () => {
            setTitle("");
            setNote("");
        }
    }, [data])

    const save = () => {
        if (data)
        {
            axios.patch('https://notes-eight-eosin.vercel.app/api/notes', { title, note, id:data.id })
            .then((res) =>
            {
                if (res.data === "Error Updating Notes")
                {
                    setErrMsg(res.data);
                }
                else {
                    setErrMsg("");
                    openEditor(null);
                }
            })
            .catch((err) => console.log(err))
        }
        else {
            axios.post(`https://notes-eight-eosin.vercel.app/api/notes`, { title, note })
            .then((res) =>
            {
                if (res.data === "Error Saving Notes")
                {
                    setErrMsg(res.data);
                }
                else {
                    setErrMsg("");
                    openEditor(null);
                }
            })
            .catch((err) => console.log(err))
        }
    }

    return (
        <div className='absolute inset-0 backdrop-blur-md z-10'>
            <div className=' mx-2 mt-2 sm:mx-36 sm:mt-12 bg-indigo-700 rounded-md p-2 sm:p-8 '>
                <div>
                    <IconContext.Provider value={{ color:"white", size:"2rem", className: "cursor-pointer ml-auto" }}>
                        <span onClick={ ()=>openEditor(null) }><AiFillCloseCircle/></span>
                    </IconContext.Provider>
                </div>
                <div className='space-y-4'>
                    <p className='text-white'>Title</p>
                    <input className='w-full px-2 py-1 rounded-sm' type="text" onChange={(e)=> setTitle(e.target.value)}  value={title}/>
                    <hr />
                    <p className='text-white'>Note</p>
                    <textarea className='w-full px-2 py-1 rounded-sm' name="" id="" cols="30" onChange={(e) => setNote(e.target.value)} value={note}></textarea>
                    <div className='flex justify-center'>
                        <button className='bg-green-500 px-4 py-2 rounded-3xl' onClick={save}>Save</button>
                        <span>{ errMsg }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor
