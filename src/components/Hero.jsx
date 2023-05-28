import logo from '../assets/logo.png'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>

        <img src={logo} alt='sumitup_logo' className='w-28 object-contain'/>

        <button
          type="button"
          onClick={() => window.open('https://github.com/aditya1ojha/SUMITUP-AI-summarizer')}
          className='black_btn'>
            GitHub
          </button>
      </nav>

        <h1 className='head_text'>Summarize Articles with <br className='max-md:hidden'/>
          <span className='bg-gradient-to-r from-purple-900 via-yellow-400 to-purple-900 bg-clip-text text-transparent'>OpenAI</span>
        </h1>

        <h2 className='desc'>Simply paste the URL of the article you're too lazy to read entirely... and BOOM! The summary is ready. The entire article summarized into a few sentences, at the click of a button.</h2>

    </header>
  )
}

export default Hero