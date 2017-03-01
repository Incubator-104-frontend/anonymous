import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

const Title = (props) => {
    return(
        <div styleName="divider">
            <hr/>
            <div styleName="text">{props.children}</div>
        </div>
    );
}

export default CSSModules(Title,style,{allowMultiple:true});