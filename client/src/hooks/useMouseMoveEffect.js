import { useEffect, useRef } from 'react';

const useMouseMoveEffect = () => {
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const element = ref.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            element.style.setProperty("--mouse-x", `${x}px`);
            element.style.setProperty("--mouse-y", `${y}px`);
        };

        const element = ref.current;
        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return ref;
};

export default useMouseMoveEffect;
