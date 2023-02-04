import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from '../Component/Detail';
import Home from '../Screen/Home/home';
import Item from '../Screen/Item';


function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Detail />}></Route>
          <Route path="item/:id" element={<Item />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Index