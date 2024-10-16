import { useState } from "react";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import Auth from "./components/Auth";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import UserBlogs from "./components/UserBlogs.jsx";

function App() {
  return (
    <>
      {/* for better clarity we use non-semantic tags */}
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<UserBlogs />} />
          <Route path="/myblogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
