import React from "react";
import Image from "next/image";
import { INewsItem } from "../page";
import NewsItem from "./NewsItem";
import Footer from "./Footer";

interface NewsPageProps {
  sections: string[];
  newsItems: INewsItem[];
  path: string;
  page: string;
  totalPage: number;
}

const NewsPage = ({
  sections,
  newsItems,
  path,
  page = "1",
  totalPage,
}: NewsPageProps) => {
  const newsEmpty = newsItems.length === 0;
  return (
    <div className="sm:mx-[18em] mx-[0.5em] sm:p-8 p-5 pb-20 gap-16 sm:px-20 sm:py-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Image
          src="/dgxp-news.svg"
          alt="Next.js logo"
          width={250}
          height={75}
          priority
        />
        <span className="font-bold font-[family-name:var(--font-noticia-text)]">
          For busy people who want to stay informed.
        </span>
        <div className="flex gap-2 flex-wrap mt-4">
          {sections.map((section) => {
            return (
              <a
                key={section}
                className="flex items-center gap-2"
                href={`/${section}`}
              >
                <span
                  className={`capitalize inline-flex items-center px-2 py-1 text-sm font-medium text-black border-b-[2.5px] ${
                    section === path ? "border-black" : "border-transparent"
                  }`}
                >
                  {section}
                </span>
              </a>
            );
          })}
        </div>

        <div className="w-full space-y-6 mt-8">
          {newsEmpty ? (
            <h1 className="text-2xl font-bold mb-10">No news found</h1>
          ) : (
            newsItems.map((news) => {
              return <NewsItem key={news.id} news={news} />;
            })
          )}
        </div>
      </main>
      <div className="flex justify-between font-[family-name:var(--font-noticia-text)] font-bold">
        <div>
          {!newsEmpty && parseInt(page) < totalPage && (
            <a
              className="text-gray-700 sm:text-lg hover:text-black"
              href={`/${path}/${parseInt(page) + 1}`}
            >
              Older News
            </a>
          )}
        </div>
        <div>
          {!newsEmpty && parseInt(page) !== 1 && (
            <a
              className="text-gray-700 sm:text-lg hover:text-black"
              href={`/${path}/${parseInt(page) - 1}`}
            >
              Newer News
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
