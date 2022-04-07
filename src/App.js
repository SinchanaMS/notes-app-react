import "./App.css";
import {Routes, Route} from "react-router-dom"
import { Login, SignUp, MockAPI, NotesList, Archive, Trash } from "./pages/pages";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <div>
      <Header/>
      <div className="container">       
        <Routes>
          <Route path="/" element={<NotesList/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/trash" element={<Trash/>} />
          <Route path="/archive" element={<Archive/>} />
          <Route path="/api" element={<MockAPI/>} />
        </Routes>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
}

export default App;
