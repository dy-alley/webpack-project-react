import React, { useState, useEffect } from 'react'
import { Iprops } from './conf'
import { CSSTransition } from 'react-transition-group'
import './styled.scss'
const Popup:React.FC<Iprops> = (props:Iprops) => {
    const { visible, position, style, timeout } = props;
    const [show, isShow] = useState(false);
    return (
            <div>
                <CSSTransition
                    in={show}
                    timeout={timeout || 0.3}
                    classNames="fade"
                    unmountOnExit
                >
                 <div className="mask" onClick={() => isShow(!show)}></div>
                </CSSTransition>
                {/* <CSSTransition
                    in={show}
                    timeout={timeout || 0.3}
                    classNames="slide"
                    unmountOnExit
                >
                    <div className="modal"></div>
                </CSSTransition> */}
            </div>
        
    )
}

export default Popup;
