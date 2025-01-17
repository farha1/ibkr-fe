import NewsPage from "./components/NewsPage";

export interface INewsItem {
  id: number;
  section: string;
  title: string;
  keyPoint: string;
  publishDate: string;
}

export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
  const sections = [
    "all",
    "world",
    "technology",
    "science",
    "environment",
    "football",
  ];
  const params = [];
  for (const section of sections) {
    const url = new URL(`${process.env.BACKEND_HOST}/news/meta`);
    if (section !== "all") url.searchParams.set("section", section);
    const posts: { totalPage: number } = await fetch(url).then((res) =>
      res.json()
    );
    params.push(
      ...Array.from({ length: posts.totalPage }, (_, i) => ({
        page: [`${i + 1}`],
        section: section,
      }))
    );
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string[]; section: string }>;
}) {
  const sections = [
    "all",
    "world",
    "technology",
    "science",
    "environment",
    "football",
  ];
  const { page, section: path } = await params;

  const url = new URL(`${process.env.BACKEND_HOST}/news`);
  url.searchParams.set("page", page?.[0] || "1");
  if (path !== "all") url.searchParams.set("section", path);

  const url2 = new URL(`${process.env.BACKEND_HOST}/news/meta`);
  if (path !== "all") url.searchParams.set("section", path);
  const newsMeta: { totalPage: number } = await fetch(url2).then((res) =>
    res.json()
  );

  const newsItems: INewsItem[] = await fetch(url).then(
    (res) => res.json()
  );
  return (
    <NewsPage
      sections={sections}
      newsItems={newsItems}
      path={path}
      page={page?.[0]}
      totalPage={newsMeta.totalPage}
    />
  );
}
