import { Routes, Route } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer'
import Teoria from './pages/Teoria'
import Laboratorios from './pages/Laboratorios'
import Home from "./pages/Home"

import MarkdownComponent from "./pages/Markdown"



export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<ResponsiveDrawer />} >
        <Route index element={<Home />} />
        <Route path="teoria" element={<Teoria />} />
        <Route path="laboratorios" element={<Laboratorios />} />
        <Route path="markdown" element={<MarkdownComponent />} />
      </Route>
    </Routes>
        
    
  );
}
