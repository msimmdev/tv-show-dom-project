customElements.define('episode-details',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('episode');
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }
);