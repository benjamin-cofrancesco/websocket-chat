class Auth {
  constructor() {
    this.user = this.getUser();
  }

  getUser() {
    const user = localStorage.getItem("user");

    if (user) {
      return JSON.parse(user);
    }

    const userName = prompt("What is your username?");

    const userData = {
      userName,
      color: getRandomColor(),
    };

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  }
}

customElements.define("chat-auth", Auth);

new Auth();
