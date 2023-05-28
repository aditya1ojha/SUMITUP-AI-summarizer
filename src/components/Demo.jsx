import { useState, useEffect } from "react";
import linkIcon from '../assets/link.svg'
import loader from '../assets/loader.svg'
import copy from '../assets/copy.svg'
import tick from '../assets/tick.svg'

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] =  useState([]);
  const [copied, setCopied] = useState("");


  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  //Storing the history in local storage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  }, []); //the dependency array is empty because we wanna execute it at the start of our app (as soon as the page loads)

  const handleSubmit = async(e) => {
    e.preventDefault(); //Whenever we work with React, it is recommended to include it. This will prevent the default behaviour of the browser which is to reload the application

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary){
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      console.log(newArticle);
      setAllArticles(updatedAllArticles); //We're pushing the new article to the array

      localStorage.setItem('items', JSON.stringify(updatedAllArticles)); //here, we are updating the local storage. Also, we'd wanna stringify the same because the local storage can only contain strings
    }
  }

  const handleCopy = (copyUrl) => {
      setCopied(copyUrl);
      navigator.clipboard.writeText(copyUrl);
      setTimeout(() => setCopied(false), 5000);
  }


  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
      <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link_icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => 
            <div 
            key={`link-${index}`}
            onClick={() => setArticle(item)}
            className="link_card">

              <div className="copy_btn" onClick={() =>
                handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt='copy_icon' className='w-[40%] h-[40%] object-contain'/>
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>

            </div>
          
          
          
          )}

        </div>

      </div>

      {/* Display Results */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ?(
          <img src = {loader} alt='loader' className="w-20 h-20 object-contain"/>
        ):error?(
          <p className="font-inter font-bold tex-black text-center">
            There seems to be something not going right.
            <br/>
            <span>
              {error?.data?.error}
            </span>
          </p>
        ):(
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">Summary of <span className="blue_gradient">Article</span></h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )

        )}


      </div>


    </section>
  )
}

export default Demo