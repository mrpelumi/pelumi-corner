import { useEffect, useState } from "react";
import { getDocQuote } from "../../utils/firebase";
import sample from "lodash/sample";

const QuoteCard = () => {
  const [quote, setQuote] = useState({});
  useEffect(() => {
    const arrQuote = [];
    const quotes = async () =>{
      const quotesResp = await getDocQuote();
      quotesResp.forEach(item => arrQuote.push(item.data()));
      setQuote(sample(arrQuote));
    }
    quotes();
  }, [])

  return (
    <div className='w-full xl:w-3/5 md:w-4/5 flex flex-col xl:p-4 p-6 items-center bg-slate-800 text-white rounded-md gap-4'>
      <div>
        <span className='text-xl'>Quote of the Week</span>
      </div>
      <div className='flex flex-col gap-3 w-4/5'>
        <span className='text-lg xl:text-xl'>{`"${quote.quote}"`}</span>
        <span className='text-right text-base'> - {quote.quoteAuthor}</span>
      </div>
    </div>
  )
}

export default QuoteCard;