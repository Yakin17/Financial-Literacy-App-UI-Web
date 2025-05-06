import React from 'react'
import { useNavigate } from 'react-router';



function HomePageUser({  }) {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };
  return (
      <div className='bg-blue-600 py-24'>
          <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                  Boost Your Financial Knowledge,<br />One Quiz at a Time
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                  Learn essential financial concepts, test your knowledge with quizzes, and track your progress.
              </p>

              <div className="mt-10">
                  <button
                      onClick={() => navigateTo('articles')}
                      className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

                  >
                    Start Learning  
                  </button>
              </div>
          </div>
      
    </div>
  )
}

export default HomePageUser
