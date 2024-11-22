import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import "./yearslider.css"

const YearSlider = ({STEP, MIN, MAX}) => {
    const [values, setValues] = useState([MIN, MAX]);

    return (
        <div className="year-slider">
            <div className="value">
                <p>Аниме с {values[0]}г. по {values[1]}г.</p>
            </div>
            <div className="slider">
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="track"
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ["var(--background-color-main)", "var(--text-color)", "var(--background-color-main)"],
                                    min: MIN,
                                    max: MAX
                                }),
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, value, index, isDragged }) => (
                        <div {...props} key={props.key} className={`thumb ${isDragged ? 'dragged' : ''}`}>
                            <div className="thumb-indicator" />
                            {/* Значение под ползунком */}
                            <div className="flag">
                                <svg width="71" height="25" viewBox="-5 -5 10 5" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M 0 0 L -6 0 C -6 0 -7 0 -7 -1 L -7 -3 C -7 -4 -6 -4 -6 -4 L -1 -4 L 0 -5 L 1 -4 L 6 -4 C 7 -4 7 -3 7 -3 L 7 -1 C 7 0 6 0 6 0 L 0 0 Z"/>
                                </svg>
                                <div className="thumb-value">Год {values[index]}</div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default YearSlider;
