import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button}  from 'react-bootstrap'
import { useEffect, useState } from 'react';

function App() {

  const[quote,setquote]=useState("")

  async function Generatequote(){
    let data=await fetch("https://api.quotable.io/random")
    let quotes=await data.json();
    console.log(quotes)
    setquote(quotes)
  }

   function copyqoute(){
    navigator.clipboard.writeText(quote.content)
    alert("Text copied")
  }

  function twitmessage(){
   let twitt='https://twitter.com/intent/tweet?url='+quote.content
   window.open(twitt,"_blank")
  }

  function textvoice(){
   let quotecontent=quote.content
   let content=quotecontent.slice(0,-1)
    let textspeak=new SpeechSynthesisUtterance(content+"by"+quote.author)
    speechSynthesis.speak(textspeak)
  }

  useEffect(()=>{
    Generatequote();
  },[])
  
  return (
    <div>
      <h1 className='text-center text-white mt-5 text'>Quotes <span className='bg-red'>Generator App</span></h1>
      <div className="container">
      <div className="row mt-5 pt-3">
        <div className="col-sm-12 text-center box">
          <div className="main-body pt-5">
            <h4>{quote.content?quote.content:"Loading..."}</h4>
            <h3 className='mt-5 text-end me-4'><span className='cl-black'>By</span> - {quote.author?quote.author:"Loading..."}</h3>
          </div>
        </div>
        <div className="buttons mt-4">
          <div className="col-sm-3">
          <Button variant="primary ms-2 btn" onClick={Generatequote}>Generate Quote</Button>
          <i className="fa-solid fa-copy copy-btn ms-4 pt-4" onClick={copyqoute}></i>
          <i className="fa-brands fa-twitter twit-btn ms-4 pt-4" onClick={twitmessage}></i>
          <i class="fa-solid fa-microphone vol-btn ms-4 pt-4" onClick={textvoice}></i>
          </div>
      </div>
    </div>
    </div>
    </div>
  );
}
export default App;
