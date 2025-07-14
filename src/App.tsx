import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/HomePage'
import ForecastPage from './pages/ForecastPage'
import WeatherHistoryPage from './pages/WeatherHistoryPage'

function App() {

  return (
   <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/forecast' element={<ForecastPage/>}/>
          <Route path='/history' element={<WeatherHistoryPage/>}/>
        </Route>
      </Routes>
   </Router>
  )
}

export default App
