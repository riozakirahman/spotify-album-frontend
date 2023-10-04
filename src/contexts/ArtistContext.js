import { createContext, useState } from "react";
export const ArtistContext = createContext({});

export function ArtistContextProvider({ children }) {
  const [artist, setArtist] = useState();

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </ArtistContext.Provider>
  );
}
