import { Checkbox, Heading } from "@shopify/polaris";
import { useRouter } from "next/router";
import { NAVBAR_SIZE } from "../utils/utils";

interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: (newValue: boolean) => void;
}

export const NavBar = ({ isDarkMode, setIsDarkMode }: NavBarProps) => {
  const router = useRouter();
  return (
    <div
      aria-label="navigation container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: NAVBAR_SIZE,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        justifyContent: "space-around",
        textAlign: "center",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        aria-label="Spacestagram title"
      >
        <Heading>Spacestagram</Heading>
      </div>
      <Checkbox
        id="_"
        label={isDarkMode ? "🌝 Light" : "🌚 Dark"}
        ariaControls="Dark mode"
        checked={isDarkMode}
        onChange={() => {
          setIsDarkMode(!isDarkMode);
          const currentState = localStorage.getItem("darkmode") === "true";
          localStorage.setItem("darkmode", !currentState ? "true" : "false");
        }}
      />
    </div>
  );
};
