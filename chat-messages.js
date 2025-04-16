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

  messageSanitise(msg) {
    return msg.replace(/[&<>"']/g, function(match) {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });
  }

  updateMessage(msg) {
    // First do the naughty word replacements on the raw text
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
      if (!updated.includes(word)) {
        continue;
      }
      updated = updated.replaceAll(word, replacer);
    }

    updated = this.messageSanitise(updated);

    for (const [emote, html] of Object.entries(emotes)) {
      if (!updated.includes(emote)) continue;
      updated = updated.replaceAll(emote, html);
    }

    return updated;
  }

  handleMessage(e) {
    const { user, message } = e.detail;

    const { userName, color } = JSON.parse(user);

    const msg = this.updateMessage(message);

    const messageEl = `<li class="message">
      <span class="username color-${color}">
        ${userName}:
      </span>
      <span class="message-text"> ${msg}</span>
      </li>`;

    this.insertAdjacentHTML("beforeend", messageEl);
  }
}

customElements.define("chat-messages", ChatMessages, { extends: "ul" });
