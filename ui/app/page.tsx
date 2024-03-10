/* eslint-disable @next/next/no-img-element */
import { inter } from "./fonts";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen">
      <div className="flex flex-col basis-2/5 p-8 bg-white">
        <div className="flex items-center min-h-24">
          <h1
            className={`${inter.className} antialiased text-2xl font-semibold`}
          >
            Generate Your System Architecture
          </h1>
        </div>
        <div>
          <form>
            <div className="space-y-12">
              <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Users:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="users"
                        name="users"
                        rows={3}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Functional requirements:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="fr"
                        name="fr"
                        rows={3}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Non-functional requirements:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="nfr"
                        name="nfr"
                        rows={3}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Other considerations:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="other"
                        name="other"
                        rows={3}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="basis-3/5 p-8">
        <div className="flex items-center justify-center">
          <img src="" alt="system diagram" />
        </div>
      </div>
    </main>
  );
}
