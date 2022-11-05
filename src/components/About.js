import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'



const About = () => {
  const a= useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line 
  }, [])
  
  return (
    <div>
        {/* ye hum iss state ko abb use kr skte hai through the concept of Context */}
        This is about {a.state.name} and currently doing BTech in {a.state.branch}
    </div>
  )
}

export default About