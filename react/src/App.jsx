import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import CantierePage from "./Pages/CantierePage"
import AziendaPage from "./Pages/AziendePage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/cantiere" element={ <CantierePage /> } />
        <Route path="/azienda" element={ <AziendaPage /> } />
      </Routes>
    </>
  )
}

export default App
