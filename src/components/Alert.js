import React from 'react'

const Alert = (props) => {
    return (
        <>   
        {/* Imported atert from Bootstrap... */}
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
        </>
    )
}

export default Alert