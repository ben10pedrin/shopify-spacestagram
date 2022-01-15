import { Button, Card, Image, Stack } from "@shopify/polaris";
import { HeartMajor, ShareMinor } from "@shopify/polaris-icons";
import { useState } from "react";
import { getVideoURLWithParameters } from "../utils/utils";

interface FeedCardProps {
  title: string;
  date: string;
  description: string;
  mediaType: "image" | "video";
  url: string;
}

export const FeedCard = ({
  title,
  date,
  description,
  url,
  mediaType,
}: FeedCardProps) => {
  const [isLongDescription, setIsLongDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const SIZE = 300;
  const MAX_DESCRIPTION_CHARS = 256;

  return (
    <div style={{ maxWidth: "350px", margin: "20px" }}>
      <Card title={title}>
        <Card.Section>
          {mediaType === "image" && (
            <Image source={url} alt="test" width={SIZE} height={SIZE} />
          )}
          {mediaType === "video" && (
            // had to use an iframe instead of a video component for cors reasons
            <iframe
              width={SIZE}
              height={SIZE}
              src={getVideoURLWithParameters(url)}
            ></iframe>
          )}
        </Card.Section>
        <Card.Section>
          <Stack>
            <div style={isLiked ? { color: "#bf0711" } : {}}>
              <Button
                icon={HeartMajor}
                monochrome
                outline
                onClick={() => setIsLiked(!isLiked)}
              />
            </div>
            <Button icon={ShareMinor} monochrome outline />
          </Stack>
        </Card.Section>
        <Card.Section>
          <p>
            <strong>{date}: </strong>
            {isLongDescription ? (
              description
            ) : (
              <>
                {description.substring(0, MAX_DESCRIPTION_CHARS) + " ... "}
                <span
                  style={{ color: "#1AA7EC", cursor: "pointer" }}
                  onClick={() => setIsLongDescription(true)}
                >
                  Show More
                </span>
              </>
            )}
          </p>
        </Card.Section>
      </Card>
    </div>
  );
};
