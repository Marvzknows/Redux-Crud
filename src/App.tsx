import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ViewTodo from './pages/ViewTodo'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='view' element={<ViewTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
