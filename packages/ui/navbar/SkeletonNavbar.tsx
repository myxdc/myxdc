import React from 'react'

import { Skeleton } from '../animated'
import { Container } from '../container'

export const SkeletonNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-20 w-full py-3 bg-white border-b border-gray-200 sm:px-4">
      <Container>
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center">
            <Skeleton height={36} width={36} borderRadius={100} />
            <span className="self-center hidden text-xl font-extrabold text-gray-700 whitespace-nowrap md:block md:ml-2">
              <Skeleton height={28} width={71} />
            </span>
          </div>
          <div className="flex justify-end md:order-2">
            <Skeleton width={293} height={47} borderRadius={100} />
          </div>
          <div
            className={`hidden lg:block lg:ml-10 lg:mr-auto absolute md:relative top-full left-0 right-0 items-center justify-center w-full md:flex md:w-auto md:order-1 shadow-xl border md:shadow-none md:border-0`}
          >
            <ul className="flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
              <li>
                <Skeleton width={41} height={20} />
              </li>
              <li>
                <Skeleton width={41} height={20} />
              </li>
              <li>
                <Skeleton width={41} height={20} />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  )
}
