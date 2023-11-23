import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import { useState } from "react";
import NoPage from "./pages/NoPage";

function App() {
  const [sentPosts, setSentPosts] = useState([]);
  const [sentUserDetails, setSentUserDetails] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Directory
              sentPosts={sentPosts}
              setSentPosts={setSentPosts}
              sentUserDetails={sentUserDetails}
              setSentUserDetails={setSentUserDetails}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Directory
              sentPosts={sentPosts}
              setSentPosts={setSentPosts}
              sentUserDetails={sentUserDetails}
              setSentUserDetails={setSentUserDetails}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile posts={sentPosts} userDetails={sentUserDetails} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
