import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInAuthEmailAndPassword } from "../../utils/firebase";

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();
  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    const {email, password} = data;
    await signInAuthEmailAndPassword(email, password);
    navigate("/admin/blog-form");
  }

  return (
    <div className="flex flex-col items-center gap-12 p-3 md:p-16 w-full sm:w-4/5 xl:w-3/5">
      <div className="w-full flex justify-center">
        <h3 className="text-gray-800 text-3xl font-bold">Admin Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col border-2 w-full md:w-4/6 p-8 gap-6 rounded-md shadow bg-slate-100 mb-16 sm:mb-8">
        {errors.root && <div>Email/Password is incorrect</div>}
        <div className="flex flex-col gap-2">
          <label className="text-gray-800 text-xl" >Email</label>
          <input className="border-2 border-gray-400 rounded-md p-2" type="text" {...register("email", {required: "Username is required"})} />
          {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <label className="text-gray-800 text-xl" >Password</label>
          <input className="border-2 border-gray-400 rounded-md p-2" type="password" {...register("password", {required: "Password is required"})} />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <button className="bg-slate-800 text-white text-lg hover:bg-slate-600 p-3 rounded-md w-full" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Login"}</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;