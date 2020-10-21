import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Popup from '@/components/Popup/Popup'
import CountDown from '@/components/countDown'
const Home: React.FC<RouteComponentProps> = (routeProps: RouteComponentProps) => {
  const [show, isShow] = useState(false)
  return (
    <div className="App">
     
      <Popup visible={show} position="bottom"/>
      <button onClick={() => isShow(true)}>点击</button>
    </div>
  );
};

export default Home;
