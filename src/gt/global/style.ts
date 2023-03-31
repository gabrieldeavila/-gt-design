import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { scrolls } from "../../utils";
import { IGLobalStyle } from "./interface";

const GlobalStyle = createGlobalStyle`
  ${reset} 

  * {
    color: ${({ theme }: IGLobalStyle) => theme.contrast};
    line-height: 1.5 !important;
    font-family: 'Kanit', sans-serif !important;
  }
  
  input:-webkit-autofill { 
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: white !important;
  }

  body {
    background: ${({ theme }: IGLobalStyle) => theme.secondary};
    ${scrolls.default};
  }

  body, input, button {
    font-family: 'Kanit', sans-serif;
  }

  ::selection {
    background: ${({ theme }: IGLobalStyle) => theme.contrast};
    color: ${({ theme }: IGLobalStyle) => theme.primary};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyle;
