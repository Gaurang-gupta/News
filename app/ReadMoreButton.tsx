import Link from "next/link";
type Props = {
    article: Article;
}
function ReadMoreButton({article} : Props) {
  return (
    <Link
        href={{
            pathname: "/article",
            query: {
                author: article.author,
                category: article.category,
                title: article.title,
                source: article.source,
                image: article.image,
                url: article.url,
                description: article.description,
                published_at: article.published_at,
                language: article.language,
                country: article.country,
            }
        }}
        className="bg-orange-400 h-10 rounded-b-lg dark:text-gray-900 hover:bg-orange-500 text-center flex flex-col justify-center"
    >
        Read More
    </Link>
  )
}

export default ReadMoreButton