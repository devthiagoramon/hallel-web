import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    mainColors: {
        principal: "#008C4F",
        secondary: "#F57D18",
        text: "#343A40",
        title: "#343A40",
        background: "#F8F9FA",
        backgroundGrey: "#F5F5F5",
        error: "#F44336",
        secondaryLigth: "#E3F2FD",
        success: "#66BB6A",
        whiteText: "#FAFAFA",
        border: "#CED4DA"
    },
    card: {
        background: "#FFD54F",
        text: "#FFFFFF",
        button: "#E3F2FD",
        header: "#005123"
    },
};

export type ThemeType = typeof theme;

const AppTheme = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
