import React, { useEffect, useState } from 'react'
import { checkHeading, strReplaceStars } from '../helper';

const Answer = ({ans}) => {

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);

    useEffect(() => {
        if(checkHeading(ans)) {
            setHeading(true)
            setAnswer(strReplaceStars(ans))
        }
    }, [])

    
  return (
    <>
        {heading? <span className='pt-2 text-lg text-zinc-300 block'>{answer}</span> : <span>{answer}</span>}
    </>
  )
}

export default Answer