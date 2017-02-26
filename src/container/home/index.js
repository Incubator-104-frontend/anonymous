import React, { Component } from 'react';
import style from './style.css';
import CSSModule from 'react-css-modules';

import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-react-firebase'

import TextFeild from '../../component/textfeild';
import Button from '../../component/button';
import ReleaseNote from '../../doc/releaseNote.md';
import Announcement from '../../doc/announcement.md';

import request from 'superagent';
import { postContentConfig } from '../../config';
const { dataToJS } = helpers

// 串接firebase 的資料，firebase其實只是拿來存webhook URL 跟總數而已
// 目前不考慮把posting data 存放在 firebase

@firebase( [
  'webhookUri',
  'total'
])
@connect(
  ({firebase}) => {
	return({
        total: dataToJS(firebase, 'total'),
		webhookUri: dataToJS(firebase, 'webhookUri'),
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
            sendStatus: '送出'
        }
        
        // document event handler
        // input 資料控制在這層

        this.handleChange = (e) => {
            this.setState({
                inputContent: e.target.value
            })
        }

        this.handleClick = (e) => {
            this.setState({ disabled: true });
            this._sendToSlack();
        }
    }
    render(){
        const { sendStatus, disabled } = this.state;
        return(
            <div>
                <div styleName="mobile-hide" className="markdown-content" dangerouslySetInnerHTML={{__html: Announcement}} />
                <div styleName="main">
                    <h4>送出後留言將直接發送至SLACK #anonymous_test</h4>
                    <TextFeild 
                        name="inputContent"
                        styleName="textarea"
                        value={ this.state.inputContent }
                        type="textarea"
                        placeholder="輸入內容"
                        onChange={ this.handleChange } />
                    <Button onClick={ this.handleClick } disabled={ disabled }>{ sendStatus }</Button>
                </div>
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
                    firebase.set('total', total+1);
                }else {
                    this.setState({ sendStatus: '好像壞掉了T.T' })
                }
            }.bind(this));
    }
}

export default Home;
