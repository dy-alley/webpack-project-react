import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CountDown from '@/components/countDown'

const Home: React.FC<RouteComponentProps> = (routeProps: RouteComponentProps) => {
  return (
    <div className="App">
      <CountDown endTime="2020-06-15 19:16:00"/> 
    </div>
  )
}

export default Home