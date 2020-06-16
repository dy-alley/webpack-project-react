import React from 'react';

type direction = 'vertical' | 'horizontal'
export interface IProps {
    direction?:direction;
    speed?:number;
}

export interface IState {
    newChildren: React.ReactElement[];
    styleCss:React.CSSProperties;
}
