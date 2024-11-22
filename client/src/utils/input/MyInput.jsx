import React from 'react';
import "./myinput.css"

const MyInput = ({type, placeholder, onChange, value, content}) => {
    return (
        <div className="my-input">
            <input type={type} placeholder={placeholder} onChange={onChange} value={value}/>
            <div>
                {content}
            </div>
        </div>
    );
};

export default MyInput;