import React from "react";
import Image from "next/image";
import Link from "next/link";
import { INewsItem } from "../[section]/[[...page]]/page";
import NewsItem from "./NewsItem";
import Footer from "./Footer";

interface NewsPageProps {
  newsItems: INewsItem[];
  path: string;
  page: string;
  totalPage: number;
}

const NewsPage = ({
  newsItems,
  path,
  page = "1",
  totalPage,
}: NewsPageProps) => {
  const sections = [
    "all",
    "world",
    "technology",
    "science",
    "environment",
    "football",
  ];
  const newsEmpty = newsItems.length === 0;
  return (
    <div className="sm:mx-[18em] mx-[0.5em] sm:p-8 p-5 pb-20 gap-16 sm:px-20 sm:py-8 font-[family-name:var(--font-noto-sans-jp)]">
      <main className="flex flex-col row-start-2 items-center">
        <Link href="/">
          <Image
            src="/ibkr.svg"
            alt="Next.js logo"
            width={217}
            height={65}
            priority
          />
        </Link>
        <div className="w-full flex flex-wrap gap-2 justify-center sm-mt-4 mt-0 sm:sticky sm:top-0 bg-white z-10 sm:py-4">
          {sections.map((section) => {
            return (
              <Link key={section} href={`/${section}`}>
                <span
                  className={`capitalize inline-flex items-center px-2 py-1 font-medium text-black border-b-[2.5px] ${
                    section === path ? "border-black" : "border-transparent"
                  }`}
                >
                  {section}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="w-full space-y-6 mt-8">
          {newsEmpty ? (
            <h1 className="text-2xl font-bold mb-10 text-center">No news found</h1>
          ) : (
            newsItems.map((news) => {
              return <NewsItem key={news.id} news={news} />;
            })
          )}
        </div>
      </main>
      <div className="flex justify-between font-medium mt-4">
        <div>
          {!newsEmpty && parseInt(page) < totalPage && (
            <Link
              className="text-gray-700 sm:text-lg hover:text-black"
              href={`/${path}/${parseInt(page) + 1}`}
            >
              Older News
            </Link>
          )}
        </div>
        <div>
          {!newsEmpty && parseInt(page) !== 1 && (
            <Link
              className="text-gray-700 sm:text-lg hover:text-black"
              href={`/${path}/${parseInt(page) - 1}`}
            >
              Newer News
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
