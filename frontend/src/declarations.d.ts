declare namespace JSX {
    interface IntrinsicElements {
        "custom-banner": CustomBannerAttributes;
    }

    interface CustomBannerAttributes extends HTMLAttributes {
        "application-name": string;
        "policy-link": string;
        "on-accept": Function
    }
  }