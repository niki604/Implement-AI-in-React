import { useState } from 'react'

import './App.css'
import { GEMINI_API_URL } from './constant';
import Answer from './component/Answer';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);

  const payload = {
    "contents": [{
      "parts": [{
        "text": question
      }]
    }]
  }
  const askQuestion = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    let response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())

    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }]);

  }

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 bg-zinc-600 h-screen text-center'></div>
      <div className='col-span-4 p-10'>
        <div className='container h-160 text-zinc-400 overflow-scroll'>
          <div className='pb-4'>
            <ul>
              {
                result.map((item, index) => (
                  <div key={index} className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ? <li className='text-right p-1 border-5 border-zinc-600 bg-zinc-600 rounded-3xl rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit' 
                      key={index}>
                        <Answer ans={item.text} /></li> : item.text.map((ansItem, ansIndex) => (
                        <li className='p-1' key={ansIndex}><Answer ans={ansItem} /></li>
                      ))
                    }
                  </div>
                ))
              }
              {/* {
            result && result.map((item, index) => (
              <li key={index}><Answer ans={item} /></li>
            ))
          } */}
            </ul>
          </div>

        </div>
        <div className='bg-zinc-600 w-1/2 text-white m-auto rounded-4xl border border-zinc-400 flex pr-5 h-13'>
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className='h-full w-full p-3 outline-none' placeholder='Ask me anything' />
          <button type='submit' onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
