import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";
const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean,
) => {
    // GraphQL query
    const query = gql`
        query MyQuery (
            $access_key: String!
            $categories: String!
            $keywords: String
        ){
            myQuery(
                access_key: $access_key
                categories: $categories
                countries: "gb, us, in, au"
                sort: "published_desc"
                keywords: $keywords
            ) {
            data {
                author
                category
                country
                description
                image
                language
                published_at
                source
                title
                url
            }
            pagination {
                count
                limit
                offset
                total
            }
            }
        }
    `;

    // Fetch function with next.js caching
    const res = await fetch('https://ravensburg.stepzen.net/api/early-eel/__graphql', {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0} : {revalidate: 20 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            }
        })
    })

    console.log(
        "LOADING NEW DATA FROM API FOR  CATEGORY >>>>> ", 
        category,
        keywords
    );

    const newsResponse = await res.json();

    // sort function by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery)
    
    return news;
    // "http://api.mediastack.com/v1/news?access_key=714c6ddbb61f8276f06bcfc9c3538541&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
}

export default fetchNews;