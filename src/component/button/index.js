import React from 'react';
import style from './style.css';
import CSSModules from 'react-css-modules';


const Button = (props) => {
    const { type, children, styles, ...others } = props;
    return(
        <button styleName={"button " + type} {...others}>{ children }</button>
    );
}
Button.defaultProps = {
    type: ''
}

export default CSSModules(Button,style,{allowMultiple:true});
