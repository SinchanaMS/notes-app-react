import "./App.css";
import {Routes, Route} from "react-router-dom"
import { Login, SignUp, MockAPI, NotesList } from "./pages/pages";
import Header from "./components/Header";

function App() {

  return (
    <div>
      <Header/>
      <div className="container">
       
        <Routes>
          <Route path="/" element={<NotesList/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/api" element={<MockAPI/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
