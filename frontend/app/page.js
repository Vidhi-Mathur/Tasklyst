import { TypewriterText } from "../components/TypeWriterText"

export default function HomePage() {
  const texts = ["planning your day", "managing projects", "tracking personal goals"]

  return (
    <>
      <main className="flex-grow p-4 md:p-8">
        <div className="flex flex-col items-center justify-start lg:justify-center min-h-screen p-4">
          <div className="max-w-4xl w-full rounded-lg pt-10 sm:pt-16 md:pt-20 lg:pt-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-gray-800">
              Stay organized and productive with Tasklyst
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 mb-6 md:mb-8">
              The sleek and intuitive to-do app designed to help you manage your tasks effortlessly. Whether you're <TypewriterText texts={texts} />, we've got you covered.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
