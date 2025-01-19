import { INewsItem } from "./[section]/[[...page]]/page";
import NewsPage from "./components/NewsPage";

export default async function Page() {
  try {
    const url = new URL(`${process.env.BACKEND_HOST}/news`);
    url.searchParams.set("page", "1");

    const url2 = new URL(`${process.env.BACKEND_HOST}/news/meta`);

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
        path={"all"}
        page={"1"}
        totalPage={newsMeta.totalPage}
      />
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    // Return a basic page with error state
    return (
      <NewsPage
        newsItems={[]}
        path={"all"}
        page={"1"}
        totalPage={1}
      />
    );
  }
}