import { Routes, Route, Navigate } from 'react-router-dom';
import  { Home }  from './container';

function App() {
  return (
    <div className="w-screen  h-screen flex items-start justify-start overflow-hidden">
      <Routes>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='*' element={<Navigate to={"/home"}/>}/>
      </Routes>
    </div>
  );
}

export default App;
