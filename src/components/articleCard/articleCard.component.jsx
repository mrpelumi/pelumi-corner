/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getImageUrl } from '../../utils/firebase';
import catImg from '../../assets/abys-cat.jpg';


const ArticleCard = ({item}) => {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");

  const {title, createdAt, imgName} = item;
  const date = createdAt.toDate();
  const datePublished = date.toDateString().slice(4);
  const urlTitle = title.replaceAll(" ", "-")

  const onClickHandler = () => {
    navigate(`/${urlTitle}`)
  }

  useEffect(() => {
    getImageUrl(imgName).then(url => setImgUrl(url))
  }, [])
  
  return (
    <div className="shadow bg-white flex p-4 justify-between md:w-full lg:w-4/5 rounded-md hover:bg-slate-100 ">
      <div className="w-3/5 flex flex-col p-2 gap-4">
        <div className="flex gap-3 text-gray-400">
          <span>{datePublished}</span>
          <span>#blog </span>
        </div>
        <div className="font-semibold text-gray-700 hover:underline hover:underline-offset-4 hover:cursor-pointer">
          <span onClick={onClickHandler}>{title}</span>
        </div>
      </div>
      <div className="w-2/5 rounded-md flex opacity-80">
        <img className='h-36 object-cover object-center rounded-md w-full hover:scale-95 transition-transform' src={imgUrl} alt="An image" />
      </div>
    </div>
  )
}

export default ArticleCard;