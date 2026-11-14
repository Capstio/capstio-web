// localStorage key of the theme the visitor picked ("light" | "dark").
// Kept out of the "use client" toggle module: a server component importing a
// value from a client module gets a client reference, not the string, and the
// theme script in the layout would read localStorage.getItem(undefined).
export const themeStorageKey = "capstio-theme";
