import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import { getDocArticleEmpty, getDocArticle, getImageUrl } from "../../utils/firebase";

import twitterIcon from '../../assets/social-icons/twitter.png';
import githubIcon from '../../assets/social-icons/github.png';
import instagramIcon from '../../assets/social-icons/instagram.png';

const SingleArticle = () => {
  const {name} = useParams();
  const dbName = name.replaceAll("-", " ");
  const [articleItem, setArticleItem] = useState({});
  const [imgUrl, setImgUrl] = useState("");

  useEffect (() => {
    const articleFunc = async () => {
      const articleDocEmpty = await getDocArticleEmpty(dbName);
      if (!articleDocEmpty){
        const articleObj = await getDocArticle(dbName);
        articleObj.forEach(article => setArticleItem(article.data()));
      }
    }
    articleFunc();
  }, []);

  useEffect(() => {
    // console.log(articleItem);
    articleItem.title ? getImageUrl(articleItem.imgName).then(url => setImgUrl(url)) : null
  }, [articleItem])

  
  return (
    <div className="w-full md:w-4/5 xl:w-3/5 flex flex-col gap-3 bg-white p-3">
      <div className="flex text-gray-400 justify-between p-2">
        <div className="flex gap-3">
          <span>{articleItem.title && articleItem.createdAt.toDate().toDateString().slice(4)}</span>
          <span>#blog</span>
        </div>
        <div>
          <span>{articleItem.title && articleItem.readMins} min read</span>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-3 pb-9">
        <span className="font-bold text-xl md:text-2xl text-gray-800">{articleItem.title}</span>
        <span className="text-gray-400 text-lg">
          {articleItem.title && articleItem.preamble}
        </span>
      </div>
      <div className="rounded-md opacity-90 pb-10">
        <img className="rounded-md h-80 object-top object-fill w-full" src={imgUrl} alt="Article Image" />
      </div>
      <div className="flex flex-col gap-4 text-lg text-gray-700 text-justify p-2 pb-5">
        {articleItem.content ? parse(articleItem.content) : null}
      </div>
      {/* contacr page */}
      <div id="contact" className='flex flex-col w-full bg-slate-800 text-white p-4 items-center rounded-md gap-4'>
      <span className='text-xl'>Get in Touch with Me</span>
      <div className='flex gap-8 items-center'>
        <Link to={"https://www.twitter.com/pelcole"}><img className='h-10' src={twitterIcon} alt="This is the twitter Icon" /></Link>
        <Link to={"https://www.github.com/mrpelumi"}><img className='h-10'  src={githubIcon} alt="This is the github Icon" /></Link>
        <Link to={"https://www.instagram.com/bhig_pelz"}><img className='h-10' src={instagramIcon} alt="This is the instagram Icon" /></Link>
      </div>
    </div>
      <hr />
      <div className='flex gap-3 text-gray-800 justify-center'>
        <span>&#169; 2024</span>
        <span>Pelumi Oguntola</span>
        <span></span>
      </div>
    </div>
  )
}

export default SingleArticle;