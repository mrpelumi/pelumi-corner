import twitterIcon from '../../assets/social-icons/twitter.png';
import githubIcon from '../../assets/social-icons/github.png';
import instagramIcon from '../../assets/social-icons/instagram.png';
import { Link } from 'react-router-dom';

const ContactCard = () => {
  return (
    <div id="contact" className='flex flex-col w-full md:w-4/5 xl:w-3/5 bg-slate-800 text-white p-4 items-center rounded-md gap-4'>
      <span className='text-xl'>Get in Touch with Me</span>
      <div className='flex gap-8 items-center'>
        <Link to={"https://www.twitter.com/pelcole"}><img className='h-10' src={twitterIcon} alt="This is the twitter Icon" /></Link>
        <Link to={"https://www.github.com/mrpelumi"}><img className='h-10'  src={githubIcon} alt="This is the github Icon" /></Link>
        <Link to={"https://www.instagram.com/bhig_pelz"}><img className='h-10' src={instagramIcon} alt="This is the instagram Icon" /></Link>
      </div>
    </div>
  )
}

export default ContactCard;