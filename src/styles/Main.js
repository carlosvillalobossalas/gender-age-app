import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 480px) {
        flex-direction: column;
        height: 1300px;
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

    @media screen and (max-width: 480px){
        flex-direction: column;
        width: 697px;
        height: 1300px;
    }
`
export const Submenu = styled.div`
    width: 700px;
    height: 95%;
    margin-top: 20px;
    /* border: 2px solid red; */
    @media screen and (max-width: 480px){
        height: 1600px;
    }
`

export const FileContainer = styled.div`
    /* border: 3px solid yellow; */
    display: flex;
    justify-content: center;
    height: 60%;
    align-items: center;

    @media screen and (max-width: 480px){
        flex-direction: column;
    }

`
export const ImgFile = styled.img`
    width: 400px;
    height: 350px;
    border: 5px solid black;

`

export const VideoFile = styled.video`
    width: 400px;
    height: 350px;
    margin: 0px 2.5px;
`

export const CanvasFile = styled.canvas`
    width: 400px;
    height: 350px;
    border-radius: 5px;
    margin: 0px 2.5px;
    background-color: lightgrey;
    border: 5px solid black;
    @media screen and (max-width: 480px){
        margin-top: 10px;
    }

`

export const OptionsContainer = styled.div`
    /* border: 2px solid black; */
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

`

export const PredictText = styled.strong`
    font-size: 1.5rem;
`
export const Result = styled.div`
    width: 700px;
    height: 95%;
    margin-top: 15px;
    @media screen and (max-width: 480px){
        margin-top: 0px;
        /* height: 1600px; */
    }
    /* border: 2px solid green; */
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

