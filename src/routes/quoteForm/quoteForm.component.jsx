import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { createdocQuote } from "../../utils/firebase";


const QuoteForm = () => {
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm();

  const onSubmitHandler = async (data) => {
    return await createdocQuote(data);
  }

  return (
    <div className="flex flex-col p-3 gap-3 w-full md:w-4/5 xl:w-3/5">
      <div className="text-xl font-bold md:text-2xl lg:text-4xl pb-8 text-gray-800 text-center">
        <h3>Quote Form</h3>
      </div>
      <form className="flex flex-col gap-5 shadow bg-slate-200 rounded-md w-full p-5" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-gray-800" htmlFor="">Author</label>
          <input className="rounded-md p-2 border-2 border-gray-400" type="text" {...register("quoteAuthor", {required: "kindly, fill in the author/anonymous"})} />
          {errors.quote && <p className='text-red-600 text-sm'>{errors.quoteAuthor.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-gray-800" htmlFor="">Quote</label>
          <textarea className="border-2 border-gray-400 rounded-md p-2" style={{resize: "none"}} rows={8} {...register("quote", {required: "kindly, fill in the quote"})} />
          {errors.quote && <p className='text-red-600 text-sm'>{errors.quote.message}</p>}
        </div>
        <div>
          <button disabled={isSubmitting} className="bg-slate-800 p-2 pl-3 pr-3 rounded-md text-white hover:bg-slate-500" type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
        </div>
      </form>
      <div className='flex p-3 justify-center gap-4 bg-sky-800 rounded-md'>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/about-form"}>About Form</NavLink>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/blog-form"}>Blog Form</NavLink>
      </div>
    </div>
  )
}

export default QuoteForm;