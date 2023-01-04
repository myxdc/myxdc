import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HelpCenterBlock({
  image,
  title,
  description,
  category,
  link,
}: {
  image: any
  title: string
  description: string
  category: string
  link: string
}) {
  return (
    <Link className="p-4 md:w-1/3" href={link}>
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
        <Image className="object-cover object-center w-full lg:h-56 md:h-36" src={image} alt={title} />
        <div className="p-6">
          <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">{category}</h2>
          <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">{title}</h1>
          <p className="mb-3 leading-relaxed">{description}</p>
          <div className="flex flex-wrap items-center ">
            <div className={`text-primary-500 inline-flex items-center md:mb-2 lg:mb-0`}>
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HelpCenterBlock
