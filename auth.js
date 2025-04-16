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

    const randomAuth = () =>
      Math.floor(
        Math.random() * (Object.entries(randomUserNames).length - 1 + 1) + 1,
      );

    if (!window.localStorage.getItem("user")) {
      const authToken =
        window.localStorage.getItem("authToken") || randomAuth();

      window.localStorage.setItem("authToken", authToken);
      window.localStorage.setItem("user", randomUserNames[authToken]);
    }
  }
}

new Auth();
