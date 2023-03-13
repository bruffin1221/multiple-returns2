import "./index.css"
import {useEffect, useState} from "react"
import React from "react"
import ReactDom from "react-dom/client"

const url = `https://dummyjson.com/users`

function Returns(){
    const[user, setUser] = useState(null)
    const[isLoading, setLoading] = useState(true)
    const[isError, setError] = useState(false)

    useEffect(()=>{
        const makeFetch= async()=>{
            try{
                const resp = await fetch(url)
                const user = await resp.json()
                setUser(user.users[0])
            } catch (error){
                setError(true)
            }
            setLoading(false)
        }
        makeFetch()
    },[])

    if(isLoading){
        return(
            <div id="card">
                <p>...Loading</p>
            </div>
        ) 
    }

    if(isError){
        return <p>...Error</p>
    }
    const {firstName, lastName, age, birthdate, image} = user
    return(
       
        <div id="card">
            <p>{firstName} {lastName}</p>
            <p>{age}</p>
            <p>{birthdate}</p>
            <img src={image} alt={firstName} width="100px" height="50px"/>
        </div>
       
    )
}

const root=ReactDom.createRoot(document.getElementById("root"))
root.render(<Returns/>)