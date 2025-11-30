import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme은 ThemeProvider 안에서만 사용해야 합니다.");
  }
  return ctx;
}
