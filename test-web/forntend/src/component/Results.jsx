import React from 'react'

const Results = ({ result , index }) => {
  return (
    <div className='flex gap-5 mb-6'>

      <p className='text-2xl font-extralight text-black/52'>
        {index+1}
      </p>

      <div className='flex flex-col gap-2'>

        {/* name */}
        <p className='text-[20px] font-medium'>
          {result.title}
        </p>

        {/* url */}
        <div>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className='text-blue-600 hover:underline'
          >
            Visit site
          </a>
        </div>

      </div>

    </div>
  )
}

export default Results