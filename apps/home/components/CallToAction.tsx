export const CallToAction = () => {
  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-4xl">
            Unlock the potential of your digital asset with MyXDC.
          </h2>
          <p className="mt-4 text-2xl font-medium">Store, swap, and stake your XinFin network assets</p>

          <div className="flex flex-col justify-center items-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
            <a
              href="https://app.myxdc.org/"
              title=""
              className="inline-flex justify-center items-center px-8 py-4 w-full text-base font-semibold text-white rounded-full border border-transparent transition-all duration-200 bg-primary-600 sm:w-auto hover:bg-primary-700 focus:bg-primary-700"
              role="button"
            >
              {' '}
              Launch App
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
