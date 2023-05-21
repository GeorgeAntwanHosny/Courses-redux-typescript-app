import React from 'react';
import './App.css';
import CourseList from './components/Courses/CourseList';
import { Route, Routes } from 'react-router-dom';
import CourseCreate from './components/Courses/CourseCreate';
import CourseUpdate from './components/Courses/CourseUpdate';
import NavigationBar from './components/shared/NavigationBar';

function App() {
  return (

    <div className="App">
      <NavigationBar/>
     <Routes>
       <Route  path="/" element={<CourseList/>}/>
       <Route  path="/:id" element={<CourseUpdate/>}/>
       <Route  path="/add-course" element={<CourseCreate/>}/>
     </Routes>
    </div>
  );
}

export default App;
