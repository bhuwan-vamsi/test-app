import React, { useState } from 'react'
import './search.css'
import {BsSearch} from "react-icons/bs";

function Search() {

    const [search,setSearch]=useState('');
    const [responseText, setResponseText] = useState(''); // State to hold the response text

    const handleChange=(event)=>{
        setSearch(event.target.value);
    }
    const handleClick=()=>{
        console.log("clicked",search);
        sendRequestToServer();
    }
    const handleKey=(e)=>{
        if(e.key === 'Enter')
        handleClick();
    }

    const sendRequestToServer = () => {
      fetch('http://localhost:5000/api/gpt3', {
        method: 'POST', // Specify the request method as POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: search }), // Pass the search query in the request body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response from server:', data);
          setResponseText(data);
        })
        .catch((error) => {
          console.error('Error sending request to server:', error);
          setResponseText('');
        });      
    };

    return (
        <div className='searchBar'>
            <input type='text'onChange={handleChange} onKeyPress={handleKey}/>
            <i onClick={handleClick}><BsSearch/></i>
            {responseText && <p>{responseText}</p>}
        </div>
    )
}

export default Search;