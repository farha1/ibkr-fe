import NewsPage from "../../components/NewsPage";

export interface INewsItem {
  id: number;
  section: string;
  title: string;
  keyPoint: string;
  publishDate: string;
  sourceUrl: string;
}

export const revalidate = 600;

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
    try {
      const url = new URL(`${process.env.BACKEND_HOST}/news/meta`);
      if (section !== "all") url.searchParams.set("section", section);
      const posts: { totalPage: number } = await fetch(url)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch meta: ${res.status}`);
          }
          const text = await res.text();
          try {
            return text ? JSON.parse(text) : { totalPage: 1 };
          } catch (error) {
            console.error(
              "Error parsing meta JSON:",
              error,
              "Response text:",
              text
            );
            return { totalPage: 1 };
          }
        })
        .catch((error) => {
          console.error(`Error fetching meta for section ${section}:`, error);
          return { totalPage: 1 };
        });

      params.push(
        ...Array.from({ length: posts.totalPage || 1 }, (_, i) => ({
          page: [`${i + 1}`],
          section: section,
        }))
      );
    } catch (error) {
      console.error(`Error processing section ${section}:`, error);
      params.push({
        page: ["1"],
        section: section,
      });
    }
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string[]; section: string }>;
}) {
  const { page, section: path } = await params;

  try {
    const url = new URL(`${process.env.BACKEND_HOST}/news`);
    url.searchParams.set("page", page?.[0] || "1");
    if (path !== "all") url.searchParams.set("section", path);

    const url2 = new URL(`${process.env.BACKEND_HOST}/news/meta`);
    if (path !== "all") url2.searchParams.set("section", path);

    // Fetch both requests in parallel for better performance
    const [newsItemsResponse, newsMetaResponse] = await Promise.all([
      fetch(url),
      fetch(url2),
    ]);

    // Handle news items response
    let newsItems: INewsItem[] = [];
    if (!newsItemsResponse.ok) {
      console.error(`Failed to fetch news: ${newsItemsResponse.status}`);
    } else {
      try {
        const text = await newsItemsResponse.text();
        newsItems = text ? JSON.parse(text) : [];
      } catch (error) {
        console.error("Error parsing news JSON:", error);
      }
    }

    // Handle meta response
    let newsMeta: { totalPage: number } = { totalPage: 1 };
    if (!newsMetaResponse.ok) {
      console.error(`Failed to fetch meta: ${newsMetaResponse.status}`);
    } else {
      try {
        const text = await newsMetaResponse.text();
        newsMeta = text ? JSON.parse(text) : { totalPage: 1 };
      } catch (error) {
        console.error("Error parsing meta JSON:", error);
      }
    }

    return (
      <NewsPage
        newsItems={newsItems}
        path={path}
        page={page?.[0]}
        totalPage={newsMeta.totalPage}
      />
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    // Return a basic page with error state
    return (
      <NewsPage
        newsItems={[]}
        path={path}
        page={page?.[0]}
        totalPage={1}
      />
    );
  }
}
