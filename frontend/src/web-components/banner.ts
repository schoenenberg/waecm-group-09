export const customBanner = () => {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
      .container {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 100px;
        padding: 10px;
        background: #ffffff;
      }
    </style>
  
    <div class="container">
      <p> Um Ihnen den bestmöglichen Service zu gewährleisten speichert WAECM personenbezogene Daten.
       Wenn Sie auf der Seite weitersurfen stimmen Sie  bitte dem Link zu.</p>
    </div>
`;

  class Banner extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('custom-banner', Banner);
};
