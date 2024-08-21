import React, { useState } from 'react';
import Header from './Header/Header';
import Login from './Login/Login';
import WelcomePage from './Welcome/WelcomePage'; 


function App() {
  const [phoneNumber, setPhoneNumber] = useState(''); 

  return (
    <div>
      <Header phoneNumber={phoneNumber} /> 
      {phoneNumber ? (
        <WelcomePage phoneNumber={phoneNumber} /> 
      ) : (
        <Login setPhoneNumber={setPhoneNumber} /> 
      )}
    </div>
  );
}

export default App;