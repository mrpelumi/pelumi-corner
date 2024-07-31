import {CKEditor} from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, Paragraph, Table, Undo, Underline, FontColor, FontSize } from 'ckeditor5';
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom';

import { serverTimestamp } from 'firebase/firestore';

import { createdocArticle, fileUpload } from '../../utils/firebase';

import 'ckeditor5/ckeditor5.css';

const BlogForm = () => {
  const [blogData, setBlogData] = useState('');
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user){
        const uid = user.uid;
        sessionStorage.setItem("userId", uid)
      } else {
        console.log("User is logged out")
      }
    })
  }, [])

  const onSubmitHandler = async (data) => {
   const {title, preamble, blogImage, readMins} = data;
   const fileProp = blogImage[0];  
   const fileName = fileProp.name;
   const {content} = blogData;
   const createdAt = serverTimestamp();
   const articleObj = {title, preamble, imgName:fileName, content, createdAt, readMins};
   await createdocArticle(title, articleObj);
   await fileUpload(fileName, fileProp)
  }

  return (
    <div className='flex flex-col p-3 gap-3 w-full md:w-4/5 xl:w-3/5 '>
      <div className='text-xl font-bold md:text-2xl lg:text-4xl pb-4 text-gray-800 text-center'>
        <h3>Blog Form</h3>
      </div>
      <form className='flex flex-col gap-4 shadow p-5 rounded-md bg-slate-200 w-full' onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='flex flex-col gap-2'>
          <label className='font-bold color-gray-600 text-xl' >Blog Title</label>
          <input className='rounded-md p-3 border-2 border-gray-400' type="text" {...register("title", {required: "kindly, enter the header"})} />
          {errors.title && <p className='text-red-600 text-sm'>{errors.title.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold color-gray-600 text-xl' >Blog Preamble</label>
          <textarea rows={5} style={{resize: 'none'}} className='rounded-md p-3 border-2 border-gray-400' type="text" {...register("preamble", {required: "kindly, enter the preamble"})} />
          {errors.preamble && <p className='text-red-600 text-sm'>{errors.preamble.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold color-gray-600 text-xl' >Minutes To Read</label>
          <input className='rounded-md p-3 border-2 border-gray-400' type="number" {...register("readMins", {required: "kindly, enter the header"})} />
          {errors.title && <p className='text-red-600 text-sm'>{errors.title.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold color-gray-600 text-xl' >Blog Image</label>
          <input className='border-2 border-slate-400 p-2 rounded-md color-gray-800' type="file" {...register("blogImage", {required: "kindly, select an image file"})} />
          {errors.blogImage && <p className='text-red-600 text-sm'>{errors.blogImage.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold color-gray-600 text-xl' >Blog Body</label>
          <CKEditor editor={ClassicEditor} config={{
            toolbar : [
              'undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', '|', 'fontColor', 'fontSize', '|',
              'link', '|', 'bulletedList', 'numberedList', 'indent', 'outdent'
            ],
            plugins : [
              Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, Paragraph, Table, Undo, Underline, FontColor, FontSize
            ], 
            initialData: '<h1>Hello from CKEditor 5!</h1>',

          }} onChange={(event, editor) => {
            const content = editor.getData();
            setBlogData({content});
          }}  />
        </div>
        <div className='flex'>
          <button disabled={isSubmitting} className='bg-slate-600 p-2 pl-5 pr-5 hover:bg-slate-400 rounded-md text-xl text-white' type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
        </div>
      </form>
      <div className='flex p-3 justify-center gap-4 bg-sky-800 rounded-md'>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/about-form"}>About Form</NavLink>
        <NavLink className="text-white font-semibold text-xl hover:underline hover:underline-offset-4" to={"/admin/quote-form"}>Quote Form</NavLink>
      </div>
    </div>
  )
}

export default BlogForm;