import { categories } from "../constants"
import fetchNews from "../lib/fetchNews"
import sortNewsByImage from "../lib/sortNewsByImage";
import NewsList from "./NewsList";
import response from "../response.json"
async function Homepage() {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(','));

  // console.log(news)

  await new Promise((resolve) => setTimeout(resolve, 3000))
// const news = sortNewsByImage(response);
  return (
    <div>
      <NewsList news={news}/>
    </div>
  )
}

export default Homepage;