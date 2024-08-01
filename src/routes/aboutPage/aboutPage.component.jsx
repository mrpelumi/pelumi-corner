import { useEffect, useState } from 'react';

import { getDocAbout } from '../../utils/firebase';

import myImg from '../../assets/Pelumi-London.jpg';

import twitterIcon from '../../assets/social-icons/twitter.png';
import githubIcon from '../../assets/social-icons/github.png';
import instagramIcon from '../../assets/social-icons/instagram.png';

import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer.component';


const AboutPage = () => {
  const [about, setAbout] = useState({});
  useEffect(() => {
    const aboutResp = async () => {
      const aboutDoc = await getDocAbout();
      setAbout(aboutDoc.data());
    }
    aboutResp();
  }, [])

  return (
    <div className='flex flex-col p-2 md:w-4/5 xl:w-3/5 gap-5 items-center'>
    <div className="flex flex-col-reverse shadow items-center rounded-md ">
      <div className="w-full flex flex-col gap-3 p-2 pt-6">
        <h3 className='text-3xl font-bold text-gray-800'>About Me</h3>
        <span className='text-lg text-gray-500 text-justify pb-3'>
          {about.description}
        </span>
      </div>
      <div className='w-full p-2 flex rounded-md'>
         <img className='h-56 lg:h-80 object-cover object-top w-full rounded-md' src={myImg} alt="About Me Image" />
      </div>
    </div>
    {/* Contact Card */}
    <div id="contact" className='flex flex-col w-full bg-slate-800 text-white p-4 items-center rounded-md gap-4'>
      <span className='text-xl'>Get in Touch with Me</span>
      <div className='flex gap-8 items-center'>
        <Link to={"https://www.twitter.com/pelcole"}><img className='h-10' src={twitterIcon} alt="This is the twitter Icon" /></Link>
        <Link to={"https://www.github.com/mrpelumi"}><img className='h-10'  src={githubIcon} alt="This is the github Icon" /></Link>
        <Link to={"https://www.instagram.com/bhig_pelz"}><img className='h-10' src={instagramIcon} alt="This is the instagram Icon" /></Link>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default AboutPage;