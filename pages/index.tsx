import { Spinner } from "@shopify/polaris";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { FeedCard } from "../components/FeedCard";
import { getDateStringWithOffset, NAVBAR_SIZE } from "../utils/utils";

export interface PhotoOfTheDay {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}

const Home: NextPage = () => {
  const [photos, setPhotos] = useState<PhotoOfTheDay[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const totalFetched = useRef(0);
  const AMOUNT = 20;

  const fetchNextPhotos = async () => {
    setIsFetching(true);
    const startDate = getDateStringWithOffset(
      totalFetched.current + AMOUNT - 1
    );
    const endDate = getDateStringWithOffset(totalFetched.current);

    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const newPhotos: PhotoOfTheDay[] = await res.json();

    setPhotos([...photos, ...newPhotos.reverse()]);
    totalFetched.current += AMOUNT;
    setIsFetching(false);
  };

  useEffect(() => {
    fetchNextPhotos();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    //stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
    if (isFetching) return;
    const percentage = e.currentTarget.scrollTop / e.currentTarget.scrollHeight;
    if (percentage > 0.8) fetchNextPhotos();
  };

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
      onScroll={handleScroll}
    >
      {photos.map((photo) => (
        // photo date is a unique string
        <FeedCard
          key={photo.date}
          title={photo.title}
          date={photo.date}
          description={photo.explanation}
          url={photo.url}
          mediaType={photo.media_type}
        />
      ))}
      {isFetching && (
        <div
          aria-label="Spinner container"
          style={{
            display: "flex",
            maxWidth: "350px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner accessibilityLabel="Spinner" size="large" />
        </div>
      )}
    </div>
  );
};

export default Home;
