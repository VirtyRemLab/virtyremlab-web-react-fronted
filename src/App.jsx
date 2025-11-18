import { Routes, Route } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer'

import Teoria from './pages/Teoria'
import RemotoAeropendulo from './pages/RemotoAeropendulo'
import Home from "./pages/Home"
import Camaras from "./pages/Camaras"
import MarkdownComponent from "./pages/Markdown"
import Sim_aeropendulo from "./pages/Sim_aeropendulo"
import Labs from "./pages/Labs"
import Docs from "./pages/Docs"
import PendulumSimulator from "./pages/PendulumSimulator"
import Aeropendulo from "./pages/Aeropendulo"
import Modulitos from "./pages/Modulitos"
import Pendulo from "./pages/Pendulo"
import Sim_modulitos from "./pages/Sim_modulitos"


export default function App() {
  return (

    <Routes>
      <Route path="/" element={<ResponsiveDrawer />} >

        <Route index element={<Home />} />
        <Route path="teoria" element={<Teoria />} />
        <Route path="markdown" element={<MarkdownComponent />} />
        <Route path="labs/"  >
          <Route index element={<Labs />} />
          <Route path="aeropendulo/"  >
            <Route index element={<Aeropendulo />} />
            <Route path="sim_aeropendulo" element={<Sim_aeropendulo />} />
            <Route path="rem_aeropendulo" element={<RemotoAeropendulo />} />
          </Route>
          {/* <Route path="modulitos" element={<Modulitos />} /> */}
          <Route path="modulitos/"  >
            <Route index element={<Modulitos />} />
            <Route path="sim_modulitos" element={<Sim_modulitos />} />
          </Route>
          <Route path="pendulo/"  >
            <Route index element={<Pendulo />} />
            <Route path="sim_pendulo" element={<PendulumSimulator />} />
          </Route>

        </Route>
        <Route path="camaras" element={<Camaras />} />
        <Route path="docs" element={<Docs />} />
        {/* <Route path="sim_pendulo" element={<PendulumSimulator />} /> */}
      </Route>
    </Routes>


  );
}
