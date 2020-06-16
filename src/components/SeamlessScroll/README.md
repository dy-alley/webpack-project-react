# 基本使用

```react
import SeamlessScroll from 'SeamlessScroll'
import React from 'react'

class Demo extends React.Component {
    render() {
        return (
        	<SeamlessScroll 
              direction="vertical" 
              speed={1}    
            >
               {/*......*/}
    		</SeamlessScroll>
        )
    }
}
```



# 横向滚动

```react
import SeamlessScroll from 'SeamlessScroll'
import React from 'react'

class Demo extends React.Component {
    render() {
        return (
        	<SeamlessScroll 
              direction="horizontal" 
              speed={1}     
               >
               {/*item编写*/}
    		</SeamlessScroll>
        )
    }
}
```





# 参数配置

| 参数      | 说明     | 类型                          | 默认类型 |
| --------- | -------- | ---------------------------- | -------- |
| direction    | 滚动的方向 | string：vertical  horizontal   | 'string：vertical'      |
| speed     | 滚动速度 | number | 1 |



