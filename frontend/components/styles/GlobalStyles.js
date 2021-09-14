import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Merriweather', serif;
  font-style: normal;
  font-weight: 700;
  src: url('/static/fonts/merriweather-v25-latin-700.woff2')
}
@font-face {
  font-family: 'Merriweather', serif;
  font-style: normal;
  font-weight: 900;
  src: url('/static/fonts/merriweather-v25-latin-900.woff2')
}
@font-face {
  font-family: 'Open Sans', serif;
  font-style: normal;
  font-weight: 400;
  src: url('/static/fonts/open-sans-v23-latin-regular.woff2')
}
html {
  --black: #03120e;
  --darkGreen:#072725;
  --green:#147072;
  --blue:#21b8bf;
  --lightBlue:#8fdbde;
  --white:#fdfdfd;
  --pink:#803e62;
  --maxWidth:1000px;
  --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  box-sizing:border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', serif;
  padding: 0;
  margin:0;
  font-size: 1.5rem;
  line-height: 2;
}
a {
  text-decoration:none;
  color:var(--black);
}
a:hover {
  text-decoration:underline;

}
button{
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', serif;
}
`;