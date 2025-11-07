import { Routes, Route } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer'

import Teoria from './pages/Teoria'
import RemotoAeropendulo from './pages/RemotoAeropendulo'
import Home from "./pages/Home"
import Camaras from "./pages/Camaras"
import MarkdownComponent from "./pages/Markdown"
import Simulaciones from "./pages/Simulaciones"
import Labs from "./pages/Labs"
import Docs from "./pages/Docs"

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<ResponsiveDrawer />} >

        <Route index element={<Home />} />
        <Route path="teoria" element={<Teoria />} />
        <Route path="remotoaeropendulo" element={<RemotoAeropendulo />} />
        <Route path="simulaciones" element={<Simulaciones />} />
        <Route path="markdown" element={<MarkdownComponent />} />
        <Route path="labs" element={<Labs />} />
        <Route path="camaras" element={<Camaras />} />
        <Route path="docs" element={<Docs />} />
      </Route>
    </Routes>


  );
}
