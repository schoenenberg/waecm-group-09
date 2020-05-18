const template = document.createElement('template');
 
template.innerHTML = `
  <style>
    .container {
      padding: 10px;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>
 
  <div class="container">
    <p>Name<p>

    <p> Um Ihnen den bestmöglichen Service zu gewähleisten speichert WAECM personenbezogene Daten.
    Wenn Sie auf der Seite weitersurfen stimmen Sie bitte dem
    <a href="">Datenschutz-Richtlinie</a>
    Link zu.  
    </p>
    <button>Zustimmen</button>
  </div>
`;
 
class Banner extends HTMLElement {
    constructor() {
        super();
     
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
     
        this.$p = shadowRoot.querySelector('p');
        this.$a = shadowRoot.querySelector('a');
        this.$button = shadowRoot.querySelector('button');
 
        this.$button.addEventListener('click', () => {
            alert(this.accept);
        });
    
      }
     
      //set and get application name
      get application(){
        return this.getAttribute('application-name');
      }
     
      set application(value) {
        this.setAttribute('application-name', value);
      }

      //set and get link to privacy policy
      get link(){
          return this.getAttribute('policy-link');
      }

      set link(value){
          this.setAttribute('policy-link', value);
      }

      //set and get on accept attributes
      get accept(){
          return this.getAttribute('on-accept');
      }

      set accept(event){
          this.setAttribute('on-accept', event);
      }
     
      attributeChangedCallback(name, oldVal, newVal) {
        this.render();
      }
     
      render() {
        this.$p.innerHTML = this.application;
        this.$a.href = this.link;
      }
}

window.customElements.define('custom-banner-js', Banner);