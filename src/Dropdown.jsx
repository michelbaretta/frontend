import React, { useState } from "react";
function Dropdown ({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ['React', 'Angular', 'Vue'];
    return (
        <div className="dropdow">
            <div className="dropdow-btn" onClick={(e) => setIsActive(!isActive)}>
                {selected}
                <span className="fa fa-caret-down"></span>
                </div>
            {isActive && (
                <div className="dropdow-content">
                    {options.map((option) => (
                        <div onClick={e => {
                            setSelected (option);
                            setIsActive(false);
                            }} 
                            className="dropdow-item">
                    {option}                 
                </div>
                    ))}                
            </div>
            )}
    </div>
    )
}

export default Dropdown;