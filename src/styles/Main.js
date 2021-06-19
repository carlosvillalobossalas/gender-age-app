import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
        width: 100vw;
        height: 1300px;
        align-items: center;
        margin-right: auto;
        margin-left: auto;
    }
    `

export const Menu = styled.div`
    background-color: #E8E8E8;
    margin-top: 5px;
    width: 1600px;
    height: 100%;
    border-radius: 20px;
    border: 5px solid #B3B3B3;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1000px){
        flex-direction: column;
        width: 100vw;
        height: 1200px;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0px;
    }
`
export const Submenu = styled.div`
    width: 700px;
    height: 95%;
    margin-top: 20px;
    /* border: 2px solid red; */
    @media screen and (max-width: 1000px){
        width: 100vw;
        height: 800px;
        display: flex;
        flex-direction: column;
    }
`

export const FileContainer = styled.div`
    /* border: 3px solid yellow; */
    display: flex;
    justify-content: center;
    height: 60%;
    align-items: center;

    /* @media screen and (max-width: 1000px){
        flex-direction: column;
        align-self: center;
        height: 400px;
    } */

`
export const ImgFile = styled.img`
    width: 400px;
    height: 350px;
    border: 5px solid black;

    @media screen and (max-width: 1000px){
        width: 250px;
        height: 300px;
        display: flex;
        align-self: center;
    }

`

export const VideoFile = styled.video`
    width: 400px;
    height: 350px;
    margin: 0px 2.5px;

    @media screen and (max-width: 1000px){
        width: 250px;
        height: 300px;
        display: flex;
        align-self: center;
    }
`

export const CanvasFile = styled.canvas`
    width: 400px;
    height: 350px;
    border-radius: 5px;
    margin: 0px 2.5px;
    background-color: lightgrey;
    border: 5px solid black;
    @media screen and (max-width: 1000px){
        margin-top: 2%;
        width: 250px;
        height: 300px;
        display: flex;
        align-self: center;
    }

`

export const OptionsContainer = styled.div`
    /* border: 2px solid black; */
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1000px){
        height: ${({ preview }) => (preview !== null ? '22%' : '15%')};
    }
`

export const ButtonFile = styled.button`
    width: 150px;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    border-width: 2px;
    border-color: #0B6EEF;
    background-color: #F4F4F4;
    font-weight: 600;
    font-size: 1.1rem;
    outline: none;
    &:focus{
        outline: none;
    }

    @media screen and (max-width: 1000px){
        margin-top: 0px;
    }


`

export const ButtonPredict = styled.button`
    width: 200px;
    height: 50px;
    background-color: #0B6EEF;
    color: #FFFFFF;
    border-radius: 10px;
    border: none;
    margin-top: 20px;
    outline: none;

    &:focus{
        outline: none;
    }

    @media screen and (max-width: 1000px){
        margin-top: 0px;
    }

`

export const PredictText = styled.strong`
    font-size: 1.5rem;
`
export const Result = styled.div`
    width: 700px;
    height: 95%;
    margin-top: 15px;
    @media screen and (max-width: 1000px){
        /* width: 250px; */
        height: 500px;
        display: flex;
        align-self: center;
        margin-top: 0px;
        flex-direction: column;
    }
`

export const ResultImageContainer = styled.div`
    /* border: 2px solid black; */
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* @media screen and (max-width:480px){
        height: 60%;
    } */
`

export const ResultImage = styled.img`
    width: 400px;
    height: 350px;
    border-radius: 5px;
    border: 5px solid black;

    @media screen and (max-width: 1000px){
        width: 250px;
        height: 300px;
        display: flex;
        align-self: center;
    }
    
    
`
export const ResultsContainer = styled.div`
    width: 100%;
    /* border: 2px solid red; */
    height: 40%;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
`

export const DataContainer = styled.div`
    border: 2px solid black;
    display: flex;
    padding: 30px 60px;
    border-radius: 20px;
    background-color: #F4F4F4;
`

export const Data = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
`

