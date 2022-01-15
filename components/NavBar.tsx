import { Checkbox, Heading } from "@shopify/polaris";
import { NAVBAR_SIZE } from "../utils/utils";

interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: (newValue: boolean) => void;
}

export const NavBar = ({ isDarkMode, setIsDarkMode }: NavBarProps) => {
  return (
    <div
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
      <Heading>Spacestagram</Heading>
      <Checkbox
        id="_"
        label={isDarkMode ? "🌝 Light" : "🌚 Dark"}
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
      />
    </div>
  );
};
