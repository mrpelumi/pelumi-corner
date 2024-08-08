import { useEffect, useState } from 'react';

import { getAllDocArticle, getImageUrl } from '../../utils/firebase';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setArticleList } from '../../store/article/article.reducer';
import { selectFirstArticle } from '../../store/article/article.selector';
import { selectArticleFilteredList } from '../../store/article/article.selector';

import ArticleCard from '../../components/articleCard/articleCard.component';
import ContactCard from '../../components/contactCard/contactCard.component';
import Footer from '../../components/footer/footer.component';
import QuoteCard  from '../../components/quoteCard/quoteCard.component';

// working with data
const BlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [articleItems, setArticleItems] = useState(4);
  const [imgUrl, setImgUrl] = useState("");
  const firstArticle = useSelector(selectFirstArticle);
  const articleList = useSelector(selectArticleFilteredList);

  const filteredArticleList = articleList.slice(0,articleItems);

  useEffect(() => {
    const articleList = [];
    const fetchArticles = async () => {
      const response =  await getAllDocArticle();
      response.forEach(item => articleList.push(item.data()));
      dispatch(setArticleList(articleList))
    }
    fetchArticles();
    
  }, [])

  useEffect(() => {
    firstArticle ? getImageUrl(firstArticle.imgName).then(url => setImgUrl(url)) : null;
  }, [firstArticle])

  const onViewHandler = (e) => {
    const newArticleNum = 3 + articleItems;
    setArticleItems(newArticleNum);
  } 

  const onClickHandler = () => {
    const urlTitle = firstArticle.title.replaceAll(" ", "-");
    navigate(`/${urlTitle}`)
  }

  return (
    <div className='flex flex-col items-center h-full w-full p-4 gap-5'>
    <div className="flex flex-col items-center p-3 gap-3 shadow bg-white rounded-md md:w-4/5 xl:w-3/5 h-3/5">
      <div className="md:w-4/5 xl:w-4/6 lg:p-2 p-1">
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold  lg:font-semibold text-slate-800 text-center hover:underline hover:underline-offset-4 hover:cursor-pointer" onClick={onClickHandler}>{firstArticle && firstArticle.title}</h2>
      </div>
      <div className="xl:w-4/6 md:w-4/5 lg:p-2 p-1 text-gray-600">
        <span>{firstArticle && firstArticle.preamble}</span>
      </div>
      <div className="flex flex-col w-full md:w-4/5 xl:w-4/6 opacity-85">
        <img className="h-56 md:h-72 rounded-md object-cover object-center hover:scale-95 transition-transform" src={imgUrl} alt='Header Image' loading='lazy' />
        <span className="text-center text-gray-400 italic text-sm">{`Image Name: ${firstArticle && firstArticle.imgName}`}</span>
      </div> 
    </div>
    <QuoteCard />
    <div className='md:w-4/5 xl:w-3/5 flex flex-col gap-6 items-center p-4'>
      <span className='text-xl text-gray-800 decoration-gray-500'>Recent Publications</span>
      {filteredArticleList.map((item, idx) => {
        return (
          <ArticleCard key={idx} item={item} />
        )
      })}
      
    </div>
    <div className='p-2 w-3/5 md:w-2/5 lg:w-1/5 flex justify-center'>
      <button className='w-4/5 p-2 rounded-md bg-[#d9d1db] text-gray-800 font-semibold hover:bg-[#969097] hover:text-gray-900 transition-colors' onClick={onViewHandler} type="submit">View More</button>
    </div>
    {/* Get in touch card */}
    <ContactCard />
    <Footer />
    </div>
  )
}

export default BlogPage;