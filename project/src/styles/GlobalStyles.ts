import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}
    @font-face {
        font-family: "Pretendard-Regular";
        src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
            format("woff");
        font-weight: 400;
        font-style: normal;
    }

    html {
        font-size: 62.5%;
        /** rem (1rem = 10px) */
    }

    * { 
        box-sizing: border-box;
        font-family: "Pretendard-Regular", sans-serif;

        ::-webkit-scrollbar {
           width: 0.5rem;  /* 스크롤바의 너비 */
        }
        ::-webkit-scrollbar-thumb {
            height: 30%; /* 스크롤바의 길이 */
            background: ${({ theme }) =>
                theme.colors.blue[3]}; /*스크롤바의 색상*/
            padding: 0.3rem;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
            background: ${({ theme }) =>
                theme.colors.gray[0]};  /*스크롤바 뒷 배경 색상*/
        }
    }  
    
    body {
        box-sizing: border-box;
        font-family: "Pretendard-Regular", sans-serif;
        font-size: 1.6rem;
        
        

    }

    button {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
    }
 
    a {
        text-decoration: none;
        color:inherit;
    }


`

export default GlobalStyle
