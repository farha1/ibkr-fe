import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const sections = [
    "all",
    "world",
    "technology",
    "science",
    "environment",
    "football",
  ];
  return (
    <div className="sm:mx-[18em] mx-[0.5em] sm:pt-36 pt-20 p-5 pb-20 gap-16 sm:px-20 sm:py-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center">
        <Image
          src="/bbsr-news.svg"
          alt="Next.js logo"
          width={500}
          height={150}
          priority
        />
        <div className="sm:w-3/4 w-full text-center flex flex-col gap-5">
          <p className="font-bold text-xl">
            We offer a new experience in reading news. For busy people who want
            to stay informed.
          </p>
          <p className="font-bold text-xl">
            Choose the topic you want to read.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-2">
            {sections.map((section) => {
              return (
                <Link
                  key={section}
                  href={`/${section}`}
                >
                  <span
                    className={`capitalize inline-flex items-center px-2 py-1 text font-medium text-black border-b-[2.5px] hover:border-black border-gray-400`}
                  >
                    {section}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
