import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../navigation/navigation.styles.scss';
import authLogo from "../../assets/pelumi-corner.png";

const AuthNav = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userVal = sessionStorage.getItem("userId");

    if (userVal){
      navigate("/admin/blog-form")
    } else {
      navigate("/admin")
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-12 main-container">
      <div className="flex justify-center bg-slate-600 p-3 w-full md:w-4/5 xl:w-3/5">
        <div className="h-1/3 w-2/5">
          <img className="h-8 w-full object-cover" src={authLogo} alt="The admin logo" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthNav;