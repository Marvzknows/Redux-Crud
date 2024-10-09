import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ViewTodo from './pages/ViewTodo'
import DataTable from './pages/DatataTable'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='view' element={<ViewTodo />} />
            <Route path='datatable' element={<DataTable />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
