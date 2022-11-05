import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'



const About = () => {
  const a= useContext(noteContext)
  return (
    <div>
        {/* ye hum iss state ko abb use kr skte hai through the concept of Context */}
        This is About {a.name}
    </div>
  )
}

export default About