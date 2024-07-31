import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import AuthNav from './routes/authNav/authNav.component';
import BlogPage from './routes/blogPage/blogPage.component';
import AboutPage from './routes/aboutPage/aboutPage.component';
import SingleArticle from './routes/singleArticle/singleArticle.component';
import BlogForm from './routes/blogForm/blogForm.component';
import AboutForm from './routes/aboutForm/aboutForm.component';
import QuoteForm from './routes/quoteForm/quoteForm.component';
import LoginPage from './routes/login/login.component';

function App() {

  return (
    <Routes>
      <Route path='/admin' element={<AuthNav />}>
        <Route index element={<LoginPage />} />
        <Route path='blog-form' element={<BlogForm />} />
        <Route path='about-form' element={<AboutForm />} />
        <Route path='quote-form' element={<QuoteForm />} />
      </Route>
      <Route path='/' element={<Navigation />} >
        <Route index element={<BlogPage />} />
        <Route path=':name' element={<SingleArticle />} />
        <Route path='/about' element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
