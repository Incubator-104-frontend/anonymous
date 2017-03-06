import React, { Component } from 'react';
import style from './style.css';
import CSSModule from 'react-css-modules';

import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-react-firebase'
import FontAwesome from 'react-fontawesome';

import TextFeild from '../../component/textfeild';
import Button from '../../component/button';
import Divider from '../../component/title';
import ReleaseNote from '../../doc/releaseNote.md';
import Announcement from '../../doc/announcement.md';

import request from 'superagent';
import { postContentConfig } from '../../config';


import Recaptcha from 'react-recaptcha';
const { dataToJS } = helpers

// 串接firebase 的資料，firebase其實只是拿來存webhook URL 跟總數而已
// 目前不考慮把posting data 存放在 firebase

@firebase( [
  'webhookUri',
  'total',
  'recaptcha'
])
@connect(
  ({firebase}) => {
	return({
        total: dataToJS(firebase, 'total'),
		webhookUri: dataToJS(firebase, 'webhookUri'),
        recaptcha: dataToJS(firebase, 'recaptcha')
	})
  }
)

@CSSModule(style)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputContent: '',
            disabled: false,
            verified: false,
            sendStatus: '送出'
        }
        
        // binding this
        this.renderInputElement = this.renderInputElement.bind(this);
        this.renderRecaptcha = this.renderRecaptcha.bind(this);

        // document event handler
        // input 資料控制在這層
        
        this.handleChange = (e) => {
            this.setState({
                inputContent: e.target.value
            })
        }

        this.handleClick = (e) => {

            if ( !this.state.disabled && this.state.inputContent.length > 0 ) {
                this.setState({ disabled: true });
                this._sendToSlack();
            }

        }
        /*
        this.verifyCallback = (response) => {
            if( response && response.length > 0 ) {
                this.setState({
                    verified: true
                })
            }
        }

        this.onLoadCallback = (e) => {
            console.log("captcha onLoad");
        }
        */
    }
    renderRecaptcha(config) {
        // 因為目前的domain 會一直跳出驗證視窗，有點煩先拿掉...

        if ( config ) {
            return <Recaptcha
                        sitekey={ config.sitekey }
                        render="explicit"
                        verifyCallback={ this.verifyCallback }
                        onloadCallback={ this.onLoadCallback }
                    />
        }
    }
    renderInputElement() {
        return <TextFeild 
                    name="inputContent"
                    styleName="textarea"
                    value={ this.state.inputContent }
                    type="textarea"
                    placeholder="輸入內容"
                    onChange={ this.handleChange } 
                />
    }
    renderSuccessBlock(status) {
        if( status === '成功送出' ) {
            return (
                <div styleName="success-block">
                    <FontAwesome
                        styleName="success-icon"
                        name='check-circle'
                        size='4x'
                    />
                    <p>訊息成功送出</p>
                </div>
            );
        }
    }
    render(){
        const { recaptcha } = this.props;
        const { sendStatus, disabled } = this.state;
        return(
            <div>
                <div styleName="mobile-hide" className="markdown-content" dangerouslySetInnerHTML={{__html: Announcement}} />
                <Divider>發文到 #104_anonymous</Divider>
                <div styleName="main">
                    
                    { this.renderInputElement() }

                    <Button onClick={ this.handleClick } disabled={ disabled } style={{ 'float': 'right' }}>{ sendStatus }</Button>
                    
                    { this.renderSuccessBlock(sendStatus) }
                </div>
                <Divider>版本訊息</Divider>
                <div className="markdown-content" dangerouslySetInnerHTML={{__html: ReleaseNote}} />
            </div>
        )
    }
    _sendToSlack() {
        const { firebase, webhookUri, total } = this.props;

        postContentConfig.text = this.state.inputContent;
        postContentConfig.username = postContentConfig.username.concat(total+1);

        // 送出資料到 incoming-webhook
        // 因為功能單純先用client post 處理
        // 未來希望這段能整個搬到 node (如果有機器可用的話...)
        // 理想狀態是用redux action 去發事件，但是現在的功能來說太小題大做

        request
            .post(webhookUri)
            .send(JSON.stringify(postContentConfig))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .end(function(err, res){
                if( res.status === 200 ) {
                    this.setState({ sendStatus: '成功送出' })
                    
                    //計算總數
                    firebase.set('total', total+1);

                    // reload page
                    setTimeout(() => { location.reload() }, 3000);
                }else {
                    this.setState({ sendStatus: '好像壞掉了T.T' })
                }
            }.bind(this));
    }
}

export default Home;
