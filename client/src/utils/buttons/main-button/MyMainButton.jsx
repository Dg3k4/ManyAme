import React from 'react';
import "./mymainbutton.css";
import {observer} from "mobx-react-lite";
import useMouseMoveEffect from '../../../hooks/useMouseMoveEffect';

const MyMainButton = ({text, type, onClick}) => {
    const ref = useMouseMoveEffect();
    let countSpan = 0;

    const createRipple = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect()

        const mouseX = parseFloat(getComputedStyle(button).getPropertyValue("--mouse-x").trim());
        const mouseY = parseFloat(getComputedStyle(button).getPropertyValue("--mouse-y").trim());

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.right = `${rect.right - mouseX - rect.width}px`;
        circle.style.bottom = `${rect.bottom - mouseY - rect.height - 115}px`;
        circle.classList.add(`ripple`, `${countSpan}`);

        const ripple = button.getElementsByClassName(`ripple`, `${countSpan}`)[0];
        countSpan++

        button.appendChild(circle);
        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    };

    return (
        <button ref={ref} className="main-button" type={type} onClick={(e) => { createRipple(e); onClick && onClick(e); }}>
            {text}
        </button>
    );
};

export default observer(MyMainButton);
