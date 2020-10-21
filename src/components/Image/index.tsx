import React, { useState, useRef } from 'react'

interface IProps {
  src: string
  style?: React.CSSProperties
  className: string
  defaultImg: string
}

const Image: React.FC<IProps> = (props) => {
  const { src, style, className, defaultImg } = props;
  const [imgError, setImgError] = useState(false)
  const ImgEle = useRef<HTMLImageElement>()

  if (!imgError) {
    return (
      <img
        ref={ImgEle}
        style={style}
        className={className}
        src={src}
        onError={() => {
          if (ImgEle.current) setImgError(true)
        }}
        alt=""
      />
    )
  } else {
    return <img style={style} className={className} src={defaultImg} alt="" />
  }
}

export default Image;