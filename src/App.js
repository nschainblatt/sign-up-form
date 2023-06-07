import Form from './Form';
import { Realtimedata } from './Realtimedata';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Signin from './Signin';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div className='form'><Form /> <Realtimedata /></div>} />
              <Route path="Signin" element={<Signin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* <div className="Form">
        <Form />
      </div>
      <div className="Realtimedata">
        <Realtimedata />
      </div> */}
    </div>
  );
}

export default App;
