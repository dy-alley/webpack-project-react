import React, { Component } from 'react'
import { Iprops, IState } from './conf'
const iNow:number = new Date().getTime();
export default class CountDown extends Component<Iprops, IState> {
    timer:any;
    constructor(props:Iprops) {
        super(props)
        this.state = {
            h: '00',
            m: '00',
            s: '00',
        }
    }
    render() {
        const { className } = this.props;
        const { h, m, s } = this.state;
        return (
            <div className={className as ''}>{`${h}:${m}:${s}`}</div>
        )
    }
    initDateToString = (iNow) => {
        var h:number | string = parseInt(`${iNow / (60 * 60)}`);
        var m:number | string = parseInt(`${iNow / 60 % 60}`);
        var s:number | string = parseInt(`${iNow % 60}`);
      
      
        if (Number(h) < 0 || Number(m) < 0 || Number(s) < 0 ) {
            clearInterval(this.timer);
            this.setState({
                h:'00',
                m:'00',
                s:'00',
            })
        } else {
            h = this.addZero(h);
            m = this.addZero(m);
            s = this.addZero(s);
            this.setState({
                h,
                m,
                s,
            })
        }

       
    }

    dateToString = () => {
        var start = new Date();
        var end = new Date(this.props.endTime);
        var lefttime = parseInt(`${(end.getTime() - start.getTime()) / 1000}`);
        this.initDateToString(lefttime)
    }
    addZero = (n:number) => {
        return n < 10 ? '0' + n: n + '';
    }
    componentDidMount() {
        this.timer = setInterval(this.dateToString,1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}
