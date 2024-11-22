import React, {useState} from 'react';
import "./mysearchinput.css"

const MySearchInput = ({type, placeholder, onChange, value}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPress, setIsPress] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value) {
            return "";
        }
    };

    const openHandler = () => {
        if (!isOpen || value === "") {
            setIsOpen(!isOpen);
        }
        setIsPress(true);
    };

    return (
        <form onSubmit={handleSubmit} className={`my-search-input-form ${isPress ? `${isOpen ? "openInput" : "closeInput"}` : ""}`}>
            <label htmlFor="my-search-input">
                { isOpen ?
                    <button onClick={() => openHandler()} type="submit"> <i className="fa-solid fa-magnifying-glass"></i> </button>
                    :
                    <i onClick={() => openHandler()} className="fa-solid fa-magnifying-glass"></i>
                }
            </label>
            <input id="my-search-input" type={type} placeholder={placeholder} onChange={onChange} value={value} autoComplete="off"/>
        </form>
    );
};

export default MySearchInput;