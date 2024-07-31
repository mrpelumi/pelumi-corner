import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import logoImg from '../../assets/pelumi-corner.png';
import './navigation.styles.scss';

const Navigation = () => {
  return(
    <div className="flex flex-col items-center gap-12 main-container">
      <div className="flex justify-between p-3 w-full md:w-4/5 xl:w-3/5 bg-slate-600 sm:justify-between text-white md:text-lg">
        <div className="h-1/3 w-1/5">
          <img className="h-8 w-full object-cover" src={logoImg} alt="This is the logo of my blog" />
        </div>
        <div className="flex w-2/5 md:w-2/5 justify-evenly">
          <Link className="hover:underline hover:underline-offset-4" to={'/'}>Blog</Link>
          <Link className="hover:underline hover:underline-offset-4" to={'/about'}>About</Link>
          <AnchorLink className="hover:underline hover:underline-offset-4" href={'#contact'}>Contact</AnchorLink>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navigation;