import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import RequestQuote from "./pages/RequestQuote";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-quote" element={<RequestQuote />} />
      </Routes>
    </Layout>
  );
};

export default App;
