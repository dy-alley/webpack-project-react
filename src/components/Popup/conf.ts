import React from 'react';

type position = 'left' | 'top' | 'right' | 'bottom';
export interface Iprops {
    visible: boolean;
    style?:React.CSSProperties;
    position:position;
    timeout?:number;
}
