import { createContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      console.log("테마 변경:", prev, "→", next);
      alert(`테마가 ${next} 모드로 변경되었습니다.`);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#222",
          color: theme === "light" ? "#222" : "#fff",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
