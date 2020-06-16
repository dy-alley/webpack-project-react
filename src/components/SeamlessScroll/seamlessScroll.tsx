import React, { Component, createRef } from 'react';
import './style.scss';
import { IProps, IState } from './conf';

class SeamlessScroll extends Component<IProps, IState> {
    content: React.RefObject<HTMLDivElement>;
    timer:any;
    speed:number;
    public static defaultProps: Partial<IProps> = {
        direction: 'vertical',
        speed: 1
    };

    constructor(props:IProps) {
        super(props);
        this.state = {
            newChildren: [],
            styleCss: {}
        };
        this.content = createRef();
        this.speed = this.props.speed as number;
    }
    render() {
        const { newChildren, styleCss} = this.state;
        return (
            <div className={'container'} style={ styleCss }>
                <div
                    className={'content'}
                    ref={this.content}
                    >
                    {newChildren}
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        // 拷贝双份子元素
        this.handleCopyChildren();
        setTimeout(() => {
            this.setState({
                styleCss: this.divStyle(this.props)
            });
        });
        const scrollCb = this.props.direction === 'vertical' ? this.handleVerticalScroll : this.handlehorizontal;
        this.timer = setInterval(scrollCb, 50);
    }

    divStyle = (props:IProps): React.CSSProperties => {
        const content = this.content.current as HTMLDivElement;
       if (content) {
            return {
                [props.direction === 'vertical' ? 'height' : 'width']: props.direction === 'vertical' ? content.offsetHeight / 2 : content.offsetWidth / 2
            };
       } else {
            return {
                [props.direction === 'vertical' ? 'height' : 'width']: ''
            };
       }
    };

    handleCopyChildren = () => {
        let arr:React.ReactElement<any>[] = [];
        React.Children.forEach(this.props.children, (child, index) => {
            const childElement = child as React.ReactElement<any>;
            let newProps = {
                key: index,
                ...childElement.props
            };
            arr.push(React.cloneElement(childElement, newProps));
        });
        React.Children.forEach(this.props.children, (child, index) => {
            const childElement = child as React.ReactElement<any>;
            let newProps = {
                key: `${index}copy`,
                ...childElement.props
            };
            arr.push(React.cloneElement(childElement, newProps));
        });

        this.setState({
            newChildren: arr
        });
    }
    handleVerticalScroll = () => {
        const content = this.content.current as HTMLDivElement;
        this.speed -= 1;
        if (this.speed <= -content.offsetHeight / 2) {
            this.speed = 0;
        } else {
            content.style.top = this.speed + 'px';
        }
    }
    handlehorizontal = () => {
        const content = this.content.current as HTMLDivElement;
        this.speed -= 1;
        if (this.speed <= -content.offsetWidth / 2) {
            this.speed = 0;
        } else {
            content.style.left = this.speed + 'px';
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

export default SeamlessScroll;
