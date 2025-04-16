class ChatMessages extends HTMLUListElement {
  connectedCallback() {
    window.addEventListener("chatMessage", this.handleMessage.bind(this));
  }

  starMessage(length) {
    let string = "";
    const star = "*";
    for (let i = 0; i < length; i++) {
      string += star;
    }

    return string;
  }

  updateMessage(msg) {
    // Definitly more extensive on other chat services;
    // Lets keep it a little pg;

    const naughtyWords = {
      fuck: this.starMessage(4),
      shit: this.starMessage(4),
      bitch: this.starMessage(5),
    };

    const emotes = {
      kappa: '<i class="kappa"></i>',
    };

    let updated = msg;

    for (const [word, replacer] of Object.entries(naughtyWords)) {
      if (!msg.includes(word)) {
        continue;
      }

      updated = updated.replaceAll(word, replacer);
    }

    for (const [emote, html] of Object.entries(emotes)) {
      if (!msg.includes(emote)) continue;

      updated = updated.replaceAll(emote, html);
    }

    return updated;
  }

  handleMessage(e) {
    const { user, message } = e.detail;

    const msg = this.updateMessage(message);

    const messageEl = `<li class="message">
      <span class="message-user">${user}</span>
      <span class="message-text">${msg}</span>
      </li>`;

    this.insertAdjacentHTML("beforeend", messageEl);
  }
}

customElements.define("chat-messages", ChatMessages, { extends: "ul" });
