import Header from './components/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './blogPosts/blogSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;