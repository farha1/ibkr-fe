"use client";

import React from "react";
import { formatRelative } from "date-fns";
import { INewsItem } from "../page";

const NewsItem = ({ news }: { news: INewsItem }) => {
  const [bulletSize, setBulletSize] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const publishDate = formatRelative(new Date(news.publishDate), new Date());

  const keyPoint = JSON.parse(news.keyPoint);

  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const handleShowMore = () => {
    setLoading(true);
    if (bulletSize + 1 > keyPoint.length) {
      setBulletSize(1);
    } else {
      setBulletSize(bulletSize + 1);
    }
    setTimeout(() => setLoading(false), getRandomNumber());
  };

  const handleShowLess = () => {
      setBulletSize(1);
  };

  const showedNews = keyPoint.slice(0, bulletSize);

  return (
    <article key={news.id} className="relative group">
      <div className="flex items-start gap-6 mb-2">
        <div className="min-w-0 flex-1 font-[family-name:var(--font-noticia-text)]">
          <div className="flex items-center gap-x-4 text-sm mb-2 font-[family-name:var(--font-geist-sans)]">
            <time dateTime={news.publishDate} className="text-xs text-gray-500">
              {publishDate}
            </time>
            <span
              className={`capitalize inline-flex items-center px-2 py-1 text-xs font-bold text-blue-800`}
            >
              {news.section}
            </span>
          </div>
          <h2 className="sm:text-[30px] text-[24px] leading-tight font-bold text-gray-900 mb-3">
            {news.title}
          </h2>
          <div className="text-gray-700 leading-6 mb-4 sm:text-[17px] text-[15px]">
            <dl>
              {showedNews.map((section: string, index: number) => {
                if (loading && index + 1 === bulletSize) {
                  return (
                    <dd className="mb-4 pb-3 animate-pulse" key={index}>
                      <div className="flex flex-col gap-2">
                        <div className="h-2 bg-slate-300 rounded w-full"></div>
                        <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                      </div>
                    </dd>
                  );
                }
                return (
                  <dd
                    className="mb-4 border-b-2 border-gray-300 pb-3 "
                    key={section}
                  >
                    {index === showedNews.length - 1 &&
                    bulletSize < keyPoint.length ? (
                      <>
                        {section}{" "}
                        <span
                          onClick={handleShowMore}
                          className="text-blue-600 cursor-pointer mt-3 block text-sm font-medium font-[family-name:var(--font-geist-sans)]"
                        >
                          Read more...
                        </span>
                      </>
                    ) : (
                      section
                    )}
                  </dd>
                );
              })}
            </dl>
            {bulletSize === keyPoint.length && (
              <span
                onClick={handleShowLess}
                className="text-red-600 cursor-pointer mt-3 block text-sm font-medium font-[family-name:var(--font-geist-sans)]"
              >
                Read less...
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
