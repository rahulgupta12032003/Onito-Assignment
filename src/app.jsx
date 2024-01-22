import React from 'react';
import Form from './Pages/Form';
import { Route, Routes } from 'react-router-dom';
import AllUsers from './Pages/AllUsers';
function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
