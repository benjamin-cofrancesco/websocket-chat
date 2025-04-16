class Auth {
  constructor() {
    const randomUserNames = {
      1: "Bessy",
      2: "Tim",
      3: "Zac",
      4: "Ollie",
      5: "Benny",
      6: "Rachel",
      7: "Luke",
    };

    const colors = {
      1: "blue",
      2: "coral",
      3: "dodgerblue",
      4: "springgreen",
      5: "yellowgreen",
      6: "green",
      7: "orangered",
      8: "red",
      9: "goldenrod",
      10: "hotpink",
      11: "cadetblue",
      12: "seagreen",
      13: "purple",
    };

    const randomColor = () =>
      Math.floor(Math.random() * (Object.entries(colors).length - 1 + 1) + 1);

    const randomAuth = () =>
      Math.floor(
        Math.random() * (Object.entries(randomUserNames).length - 1 + 1) + 1,
      );

    if (!window.localStorage.getItem("user")) {
      const authToken =
        window.localStorage.getItem("authToken") || randomAuth();

      window.localStorage.setItem("authToken", authToken);
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          userName: randomUserNames[authToken],
          color: randomColor(),
        }),
      );
    }
  }
}

new Auth();
