import React, { Component } from 'react';

interface Iprops {
    type:string;
    content:string;
}
class Notice extends Component<Iprops> {
    render() {
        const icons = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
            loading: 'icon-loading'
        }
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type}`}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#${icons[type]}`} />
                </svg>
                <span>{content}</span>
            </div>
        )
    }
}

export default Notice;





