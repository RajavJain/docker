import React from 'react'

function alert(props) {

    const capitalize = (word) => {
        if(word==="danger"){
            word="Error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: "50px" }}>
            {
                //isme props.alert send kiya hai agar null hota hai then kuch nhi hoga but agar null nhi hota then jo agla div hai wo follow ho jaaegi....
                //this syntax is commonly used by Community
                props.alert 
                &&
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong> {capitalize(props.alert.type)} </strong>: {props.alert.msg}
                </div>
            }
        </div>
    )
}
export default alert