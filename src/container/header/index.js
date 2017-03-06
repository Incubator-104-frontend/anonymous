import React from 'react';
import style from './style.css';
import CSSModule from 'react-css-modules';
import logo from './logo.jpg'

const Header = (props) => {
    return (
        <header styleName="header">
            <img src={logo} alt="靠北壹靈寺SLACK"/>
            <span>靠北壹靈寺 to SLACK</span>
        </header>
    )
}

export default CSSModule(Header,style);