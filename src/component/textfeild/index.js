import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import calculateNodeHeight from './calculateNodeHeight';
import style from './style.css';
class TextFeild extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
        this.inputNode = null;
    }
    
    // react lifeCycle method 寫在render 上方，方便總覽整隻程式的生命週期
    componentDidMount() {
        // 當component initial 完成之後 （client render）去抓取node的DOM結構並且計算真實的style
        // 寫進state 裡面 （state裡面只存放跟data 沒有關連的UI邏輯 ）
        this.setState({
            style: this._resizeElement(this.inputNode)    
        })
    }   

    componentWillReceiveProps(nextProps) {
        // 當父層的value 更新之後pass value 下來會在這邊接收到更新訊息
        // 這時候重新計算input 的scrollHeight，取得應該有的高度寫進state裡
        if ( nextProps.value !== this.props.value ) {
            this.setState({
                style: this._resizeElement(this.inputNode)    
            })
        }
    }

    // 使用自定義的render function 回傳複雜的條件判斷markup 
    // 盡量避免在function 內產生side effect，保持function 的pure 方便測試
    get renderInput() {
        const { style } = this.state;
        const { type, styles, className, ...others } = this.props;
        switch(type){
            case 'textarea': 
                return (
                    <textarea 
                        ref={ node => { this.inputNode = node;}}
                        styleName="textarea"
                        style={style}
                        { ...others } 
                    />
                );
            default:
                return (
                    <input 
                        ref={ node => { this.inputNode = node;}}
                        styleName="input"
                        { ...others } 
                    />
                );
        }
    }

    render() {
        // 強制props 只能用object spread 方式取值，避免直接使用 this.props.data 的方式
        const { maxWords, value, errorMessage, className } = this.props;

        // 將static markup 用變數存起來，方便整理跟重用 
        const renderMaxWords = maxWords ? (
            <span styleName="maxWord">
                <span styleName="front">{value.length}</span>/{maxWords}
            </span>
        ): null;

        const renderErrorMessage = errorMessage ? (
            <div styleName="errorMessage">{ errorMessage }</div> 
        ) : null;  

        // render return 的JSX語法盡量簡潔，並且用意義清楚的方式命名
        return (
            <div styleName={'inputRoot'} className={className}>
                { this.renderInput }
                { renderMaxWords }
                { renderErrorMessage }
            </div>
        );
    }

    // 自定義function 寫在render 下方，區隔開lifecycle method
    _resizeElement(inputNode) {
        return calculateNodeHeight(
                inputNode,
                false,
                this.props.minRows,
                this.props.maxRows
            )
    }
}

// 嚴格定義propTypes，必要參數跟optional 參數必須定義清楚
TextFeild.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    maxWords: PropTypes.number,
    onChange: PropTypes.func,
	onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
}
TextFeild.defaultProps = {
    // type could be number, text, email, textarea... html5 input type
	type: 'text',
    disabled: false
}

export default CSSModules(TextFeild,style,{allowMultiple:true});