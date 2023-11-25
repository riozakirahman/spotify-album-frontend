class SpotifyService {
  static async fetchArtist(
    token,
    setArtist,
    setNextPage,
    url,
    artist,
    setLoggedIn,
    setIsLoading
  ) {
    try {
      setIsLoading(true);
      const uri =
        url || "https://api.spotify.com/v1/me/top/artists?offset=0&limit=3";
      const response = await fetch(`${uri}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Access token expired. Refreshing token...");
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("code");
      }
      if (!response.ok) {
        console.error("Error fetching artist data:", response.statusText);
        localStorage.removeItem("user");
        return;
      }

      const data = await response.json();
      if (artist) {
        setIsLoading(false);
        setArtist([...artist, ...data.items]);
      } else {
        setIsLoading(false);
        setArtist(data.items);
      }
      if (data.next !== null) {
        setIsLoading(false);
        setNextPage(data.next);
      } else {
        setNextPage(null);
      }
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  }

  static async fetchProfile(token, setUser, setLoggedIn, setIsLoading) {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Access token expired. Refreshing token...");
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("code");
      }

      if (!response.ok) {
        console.error("Error fetching user data:", response.statusText);
        localStorage.removeItem("user");
        return;
      }

      const data = await response.json();
      if (data) {
        setIsLoading(false);
        const dataString = JSON.stringify(data);
        localStorage.setItem("user", dataString);
        await setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  static async fetchToken(code, setLoggedIn, setToken, setRefToken, navigate) {
    try {
      const response = await fetch(
        `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=https://myartist.mooo.com/artist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic NzY0Nzk5ZTc1ZTBhNGFkMWJlMDIyY2MwYmQ3ODVmY2Y6OTQ2MWY3OGYzMGY5NDM3NDhiZDIxODZmMjBiOWNjMzM=",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        setToken(data.access_token);
        localStorage.setItem("token", data.access_token);
        setRefToken(data.refresh_token);
        localStorage.setItem("reftoken", data.refresh_token);
      }

      if (!response.ok) {
        localStorage.removeItem("code");
        localStorage.removeItem("token");
        localStorage.removeItem("reftoken");
        localStorage.removeItem("user");
        setLoggedIn(false);
      }
    } catch (error) {}
  }
  static async exit(setToken, setCode, setLoggedIn, setRefToken, navigate) {
    await localStorage.removeItem("token");
    setToken("");
    await localStorage.removeItem("code");
    setCode("");
    await localStorage.removeItem("reftoken");
    await localStorage.removeItem("user");
    setRefToken("");
    setLoggedIn(false);
    navigate("/");
  }
  static refreshToken = async (refresh_token, setToken) => {
    const response = await fetch(
      `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic NzY0Nzk5ZTc1ZTBhNGFkMWJlMDIyY2MwYmQ3ODVmY2Y6OTQ2MWY3OGYzMGY5NDM3NDhiZDIxODZmMjBiOWNjMzM=",
        },
      }
    );

    const data = await response.json();

    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
  };
}

export default SpotifyService;
