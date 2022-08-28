interface Theme {
   bg: string;
   bgLighter: string;
   text: string;
   textSoft: string;
   soft: string;
}

export const darkTheme: Theme = {
   bg: "#181818",
   bgLighter: "#282828",
   text: "white",
   textSoft: "#aaaaaa",
   soft: "#373737",
};

export const lightTheme: Theme = {
   bg: "#f9f9f9",
   bgLighter: "white",
   text: "black",
   textSoft: "#606060",
   soft: "#f5f5f5",
};
