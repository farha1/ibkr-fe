"use client";

import React from "react";
import { formatRelative } from "date-fns";
import { INewsItem } from "../[section]/[[...page]]/page";
import Image from "next/image";

const NewsItem = ({ news }: { news: INewsItem }) => {
  const [bulletSize, setBulletSize] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const publishDate = formatRelative(new Date(news.publishDate), new Date());

  let keyPoint = [];
  try {
    keyPoint = JSON.parse(news.keyPoint);
  } catch (error) {
    setError(true);
    console.log(error);
  }

  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * (1000 - 400 + 1)) + 400;
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

  const showedNews = keyPoint.slice(0, bulletSize);

  return (
    <article key={news.id} className="relative group">
      <div className="flex items-start gap-6 mb-2 border-b-2 border-gray-200">
        <div className="min-w-0 flex-1 font-[family-name:var(--font-noto-sans-jp)]">
          <div className="flex items-center gap-x-4 text-sm mb-4 font-[family-name:var(--font-noto-sans-jp)]">
            <time dateTime={news.publishDate} className="text-xs text-gray-500">
              {publishDate}
            </time>
            <span
              className={`capitalize inline-flex items-center px-2 py-1 text-xs font-bold text-blue-700`}
            >
              {news.section}
            </span>
          </div>
          <h2 className="sm:text-[30px] text-[24px] leading-tight font-semibold mb-3 font-[family-name:var(--font-noto-serif-devanagari)]">
            {news.title}
          </h2>
          <div className="text-gray-700 font-medium leading-6 mb-4 sm:text-[18px] text-[17px] font-[family-name:var(--font-noto-serif-devanagari)]">
            <div>
              {!error &&
                showedNews.map((section: string, index: number) => {
                  if (loading && index + 1 === bulletSize) {
                    return (
                      <div className="mb-4 py-2 pl-3 animate-pulse" key={index}>
                        <div className="flex flex-col gap-2">
                          <div className="h-2 bg-slate-300 rounded w-full"></div>
                          <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      className="mb-4 border-l-[3px] border-gray-400 py-2 pl-3 even:bg-gray-100 font-[family-name:var(--font-noto-sans-jp)]"
                      key={index}
                    >
                      {section}
                    </div>
                  );
                })}
            </div>
            {bulletSize === keyPoint.length ? (
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 cursor-pointer mt-5 block font-medium font-[family-name:var(--font-noto-sans-jp)]"
              >
                Read the original news
                <Image
                  className="inline ml-1"
                  src="/newtab.svg"
                  alt="newtab"
                  width={12}
                  height={12}
                />
              </a>
            ) : (
              <button
                disabled={loading}
                onClick={handleShowMore}
                className="text-blue-700 mt-2 cursor-pointer block font-medium font-[family-name:var(--font-noto-sans-jp)]"
              >
                Read more...
              </button>
            )}
            {error && (
              <div className="mt-5">
                <h1 className="text-xl font-bold">
                  Something went wrong. Please try again later.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
