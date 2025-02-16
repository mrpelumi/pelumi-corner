import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { createdocAbout } from "../../utils/firebase";

import { useToast } from "../../hooks/use-toast";
import { Toaster } from '../../components/ui/toaster';
import { Loader2 } from 'lucide-react';

const AboutForm = () => {
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm();
  const {toast} = useToast();

  const onSubmitHandler = async (data) => {
    const owner = "Pelumi";
    const {description} = data;
    await createdocAbout({owner, description})
    .then(() => {
      toast({
        title: "About Post Uploaded Successfully",
        description: "The about post has been uploaded successfully",
        variant: "success",
        duration: 2000
       })
    })
    .catch(() => {
      toast({
        title: "About Post Upload Rejected",
        description: "The about post has been rejected",
        variant: "destructive",
        duration: 2000
       })
    })
  }

  return (
    <div className="flex flex-col p-3 gap-3 w-full md:w-4/5 xl:w-3/5">
      <div className="text-xl font-bold md:text-2xl lg:text-4xl pb-8 text-gray-800 text-center">
        <h3>About Form</h3>
      </div>
      <form className="flex flex-col gap-5 shadow bg-slate-200 rounded-md w-full p-5 mb-16" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-gray-800" htmlFor="">Description</label>
          <textarea className="border-2 border-gray-400 rounded-md p-2" style={{resize: "none"}} rows={8} {...register("description", {required: "kindly, fill in your details"})} />
          {errors.description && <p className='text-red-600 text-sm'>{errors.description.message}</p>}
        </div>
        <div>
        <button disabled={isSubmitting} className='bg-slate-600 p-2 pl-5 pr-5 hover:bg-slate-400 rounded-md text-xl text-white' type="submit">{isSubmitting ? (<div className="flex flex-row items-center gap-2"><Loader2 className="animate-spin" />Loading</div >) : "Submit"}</button>
        </div>
      </form>
      <Toaster />
      <div className='flex p-3 justify-center gap-4 bg-sky-800 rounded-md'>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/blog-form"}>Blog Form</NavLink>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/quote-form"}>Quote Form</NavLink>
      </div>
    </div>
  )
}

export default AboutForm;