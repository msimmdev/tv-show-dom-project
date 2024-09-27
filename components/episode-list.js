customElements.define(
  "episode-list",
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById("episode-list");
      const templateContent = template.content;

      this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true)
      );
    }

    static get observedAttributes() {
      return ["search-term"];
    }

    connectedCallback() {
      this.allEpisodes = getAllEpisodes();
      this.renderEpisodes(this.allEpisodes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.allEpisodes) {
        if (name === "search-term") {
          let filteredEpisodes = this.allEpisodes.filter(
            (episode) =>
              episode.name.toLowerCase().includes(newValue) ||
              episode.summary.toLowerCase().includes(newValue)
          );
          this.clear();
          this.renderEpisodes(filteredEpisodes);
        }
      }
    }

    clear() {
      const detailsList = this.shadowRoot.querySelectorAll('episode-details');
      for (let episodeDetails of detailsList) {
        this.shadowRoot.removeChild(episodeDetails);
      }
    }

    renderEpisodes(episodeList) {
      const rootElem = this.shadowRoot;
      for (let episode of episodeList) {
        let seasonTag = `S${episode.season
          .toString()
          .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
        let airDate = new Date(episode.airdate);

        let episodeDetails = document.createElement("episode-details");

        this.createSpanSlot(episodeDetails, "episode-name", episode.name);
        this.createSpanSlot(episodeDetails, "episode-season", seasonTag);
        this.createSpanSlot(
          episodeDetails,
          "episode-airdate",
          airDate.toLocaleDateString()
        );
        this.createSpanSlot(episodeDetails, "episode-airtime", episode.airtime);
        this.createSpanSlot(
          episodeDetails,
          "episode-runtime",
          this.formatTime(episode.runtime)
        );

        let summarySpan = document.createElement("span");
        summarySpan.innerHTML = episode.summary;
        summarySpan.slot = "episode-summary";
        episodeDetails.appendChild(summarySpan);

        let episodeImage = document.createElement("img");
        episodeImage.src = episode.image.medium;
        episodeImage.slot = "episode-image";
        episodeDetails.appendChild(episodeImage);

        rootElem.appendChild(episodeDetails);
      }
    }

    createSpanSlot(template, slot, text) {
      let spanElem = document.createElement("span");
      spanElem.textContent = text;
      spanElem.slot = slot;
      template.appendChild(spanElem);
    }

    formatTime(mins) {
      if (mins >= 60) {
        let hours = Math.floor(mins / 60);
        let newMins = mins % 60;
        if (newMins > 0) {
          return `${this.formatHours(hours)} + ${this.formatMins(newMins)}`;
        }
        return this.formatHours(hours);
      }
      return this.formatMins(mins);
    }

    formatHours(hours) {
      if (hours === 1) {
        return `${hours} hour`;
      }

      return `${hours} hours`;
    }

    formatMins(mins) {
      if (mins === 1) {
        return `${mins} minute`;
      }

      return `${mins} minutes`;
    }
  }
);
