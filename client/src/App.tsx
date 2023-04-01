import "./App.css";
import UploadFile from "./components/UploadFile";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import CustomTable from "./components/CustomTable";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Header />
        <Routes>
          <Route path="/" element={<CustomTable />}></Route>
          <Route path="/uploadFile" element={<UploadFile />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
