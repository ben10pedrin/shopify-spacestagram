import { GetServerSideProps } from "next";
import { PhotoOfTheDay } from ".";
import { FeedCard } from "../components/FeedCard";
import { NAVBAR_SIZE } from "../utils/utils";

const SinglePost: React.FC<PhotoOfTheDay> = ({
  date,
  title,
  explanation,
  media_type,
  url,
}) => {
  return (
    <div
      aria-label="FeedCard container"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        height: `calc(100vh - ${NAVBAR_SIZE})`,
        marginTop: NAVBAR_SIZE,
        overflowY: "scroll",
      }}
    >
      <FeedCard
        date={date}
        description={explanation}
        mediaType={media_type}
        title={title}
        url={url}
      />
    </div>
  );
};

export default SinglePost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { date } = context.query;
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const photo: PhotoOfTheDay = await res.json();

  if (res.status != 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: photo,
  };
};
