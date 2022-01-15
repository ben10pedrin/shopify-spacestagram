import { Button, Card, Image, Stack } from "@shopify/polaris";
import { HeartMajor, ShareMinor, PromoteMinor } from "@shopify/polaris-icons";
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
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const SIZE = 300;
  const MAX_DESCRIPTION_CHARS = 256;

  const handleShare = () => {
    setIsCopiedVisible(true);
    navigator.clipboard.writeText(window.location.origin + "/" + date);
    setTimeout(() => setIsCopiedVisible(false), 1000);
  };

  const handleVisit = () => {
    window.open(window.location.origin + "/" + date);
  };

  return (
    <div
      style={{ maxWidth: "350px", margin: "20px" }}
      aria-label="FeedCard Box"
    >
      <Card title={title}>
        <Card.Section>
          {mediaType === "image" && (
            <Image
              source={url}
              alt={description}
              title={title}
              width={SIZE}
              height={SIZE}
            />
          )}
          {mediaType === "video" && (
            // had to use an iframe instead of a video component for cors reasons
            <iframe
              width={SIZE}
              height={SIZE}
              title={title}
              src={getVideoURLWithParameters(url)}
            ></iframe>
          )}
        </Card.Section>
        <Card.Section>
          <Stack alignment="center">
            <div
              aria-label="Like Button Outline"
              style={isLiked ? { color: "#bf0711" } : {}}
            >
              <Button
                icon={HeartMajor}
                monochrome
                outline
                onClick={() => setIsLiked(!isLiked)}
                accessibilityLabel="Like button"
              />
            </div>
            <Button
              icon={PromoteMinor}
              monochrome
              outline
              onClick={handleVisit}
              accessibilityLabel="Open in new tab button"
            />
            <Button
              icon={ShareMinor}
              monochrome
              outline
              onClick={handleShare}
              accessibilityLabel="Share button"
            />
            {isCopiedVisible && (
              <p
                style={{ color: "#1AA7EC" }}
                aria-label="Copied to clipboard Text"
              >
                Copied to clipboard!
              </p>
            )}
          </Stack>
        </Card.Section>
        <Card.Section>
          <p aria-label="Photo description">
            <strong aria-label="Photo date">{date}: </strong>
            {isLongDescription ? (
              description
            ) : (
              <>
                {description.substring(0, MAX_DESCRIPTION_CHARS) + " ... "}
                <span
                  aria-label="Expand Text"
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
