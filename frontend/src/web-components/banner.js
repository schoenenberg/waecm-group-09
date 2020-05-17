

const template = document.createElement('template');
 
template.innerHTML = `
  <style>
    .container {
      padding: 8px;
      background: #fffff; 
    }
  </style>
 
  <div class="container">
    <h1>WAECM </h1>
    <p> Um Ihnen den bestmoglichen Service zu gew ̈ahleisten speichert WAECM personenbezogene Daten. Wenn Sie auf der Seite weitersurfen stimmen Sie bitte der Link zu.</p>
  </div>
`;
 
export class Banner extends HTMLElement {
  constructor() {
    super();
 
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
 
window.customElements.define('custom-banner', Banner);
