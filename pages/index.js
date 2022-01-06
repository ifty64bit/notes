import { useState } from "react"
import Card from "../components/Card";
import Editor from "../components/Editor";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IconContext } from "react-icons";
import axios from "axios";
export default function Home({_data}) {
  
  const [data, setData] = useState(_data);
  const [activeNote, setActiveNote] = useState();
  const [isOpen, setOpen] = useState(false);

  const refresh = () => {
    axios.get(`https://notes-eight-eosin.vercel.app/api/notes`)
        .then((res) => {
          //console.log(res);
          setData(res.data)
        })
        .catch(err => console.log(err))
  }

  const openEditor = (_data) => {
    setActiveNote(_data);
    if (isOpen)
    {
      refresh();
    }
    setOpen(!isOpen);
  }

  const del = (id) => {
    axios.delete(`https://notes-eight-eosin.vercel.app/api/notes`, { data: { id }})
        .then((res) => {
          refresh();
        })
        .catch(err => console.log(err))
  }

  

  return (
    <div className="mx-1 mt-1 sm:mx-12 sm:mt-4 flex flex-wrap gap-2 justify-center">
      {
        data.length<=0 ? "Opps No Note Saved" : 
        data.map((d) => {
          return (
            <Card key={d.id} data={d} onClick={openEditor} del={del}>
              {d.title}
              <hr />
              {d.note}
            </Card>
          )
        })
      }
      
      {isOpen && <Editor data={activeNote} openEditor={openEditor}/>}

      <div className=" absolute bottom-8 right-8 z-0 animate-bounce" onClick={()=>openEditor(null)}>
        <IconContext.Provider value={{ size:"4rem", className: "cursor-pointer" }}>
          <AiOutlinePlusCircle/>
        </IconContext.Provider>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://notes-eight-eosin.vercel.app/api/notes')
  const data = await res.json()

  // Pass data to the page via props
  return { props: { _data:data } }
}
