import React from 'react';
import ReactDom from 'react-dom'
import { Iprops, IState } from './conf'
import { CSSTransition, TransitionGroup  } from 'react-transition-group'
import Notice from './notice'


class Notification extends React.Component<Iprops, IState> {
    transitionTime:number;
    constructor(props) {
        super(props)
        this.state = {
            notices: []
        }
        // 
        this.transitionTime = 300;
    }
    //定义key值
    getNoticeKey = () => {
        const { notices } = this.state;
        return `notices-${new Date().getTime()}-${notices.length}`;
    }
    addNotice = (notice) => {
        const { notices } = this.state;
       
        // 给添加进来的notice添加key
        notice.key = this.getNoticeKey();
        // 判断当前notice是否存在
        const bStop = notices.every(item => item.key !== notice.key)
        // 如果存在则判断notices长度是否大于0 并且最后一个notice的type是不是loading
       
        if (bStop) {
            if (notices.length > 0 && notices[notices.length - 1].type === 'loading') {
                // 如果大于0 并且最后一个type类型也是loading则添加到notices中去 this.transitionTime时间后再更新notices
                notices.push(notice)
                
                setTimeout(() => {
                    this.setState({ notices })
                }, this.transitionTime)
            } else {
                // 否则取反
                notices.push(notice)
                this.setState({ notices })
            }
            //  如果传递了duration 则用传入的
            if (notice.duration > 0) {
                setTimeout(() => {
                     this.removeNotice(notice.key)
                }, notice.duration)
            }
        }

        return () => {
            this.removeNotice(notice.key);
        }
    }

    // 移除notice
    removeNotice = (key) => {
        const { notices } = this.state;
        this.setState({
            notices:notices.filter(notice => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime);
                    return false;
                }
                return true;
            })
        })
    }

    render(){
        const { notices } = this.state;
        return (
            <TransitionGroup className="toast-notification">
                {notices.map(notice => (
                <CSSTransition
                    key={notice.key}
                    classNames="toast-notice-wrapper notice"
                    timeout={this.transitionTime}
                >
                    <Notice {...notice} />
                </CSSTransition>
                ))}
            </TransitionGroup>
        )
    }
}



// 用于向页面添加和移除Notification组件
function createNotification() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    /*
        这里需要注意:在以前的版本中ReactDOM.render是有返回值的，返回值是组件的实例
        但是现在不能使用了，改成如下操作
        const notification = ReactDom.render(<Notification/>, div);
    */
    let el:React.RefObject<Notification> = React.createRef();
    ReactDom.render(<Notification ref={el}/>, div);  
    return {
        // 添加提示
        addNotice(notice) {
            setTimeout(() => {
                return el.current.addNotice(notice)
            })
        },
        // 移除提示
        destroy() {
            ReactDom.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

export default createNotification;