import React, { useCallback, useEffect, useRef, useState } from 'react'
import { storage } from '../firebase/firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {
    Container,
    Menu,
    Submenu,
    Result,
    FileContainer,
    ImgFile,
    VideoFile,
    CanvasFile,
    OptionsContainer,
    ButtonFile,
    ButtonPredict,
    PredictText,
    ResultImageContainer,
    ResultsContainer,
    ResultImage,
    Data,
    DataContainer
} from '../styles/Main'

const axios = require('axios').default;

const Main = () => {

    let w, h, ratio;

    const fileInputRef = useRef();

    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [imageToFirebase, setImageToFirebase] = useState()

    const [preview, setPreview] = useState();
    const [videoPreview, setVideoPreview] = useState();
    const videoSnapshot = useRef();
    const videoRef = useRef();


    const [imageName, setImageName] = useState('');
    const [transfered, setTransfered] = useState(0)
    const [uploading, setUploading] = useState(false);
    const [transferedFinished, setTransferedFinished] = useState(false)
    const [result, setResult] = useState();
    const [animating, setAnimating] = useState(false)

    const handleChangeFile = (event) => {
        event.preventDefault();


        const file = event.target.files[0];

        if (file) {
            if (file.type.substr(0, 5) === 'video') {
                setVideo(file)
            }
            else if (file && file.type.substr(0, 5) === 'image') {
                setImage(file)
                setImageToFirebase(file)
            } else {
                console.log('No es imagen o video')
                setImage(null);
                setVideo(null);
            }
        }
    }

    const handleFile = (file, type) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'imagen') {
                setPreview(reader.result);
            } else {
                setVideoPreview(reader.result)
            }
        }
        reader.readAsDataURL(file);
    };

    const handleSnap = () => {
        const context = videoSnapshot.current.getContext('2d')
        context.fillRect(0, 0, w, h);
        context.drawImage(videoRef.current, 0, 0, w, h)

        videoSnapshot.current.toBlob(function (blob) {
            setImageToFirebase(blob)
        }, 'image/jpeg')
    }

    const handleFirebaseUpload = async () => {

        console.log('start of upload...')

        if (imageToFirebase) {
            setUploading(true);
            setTransfered(0);

            const name = uuidv4();
            const filename = name + '.jpg';

            const storageRef = storage.ref(`uploaded/${filename}`);
            const task = storageRef.put(imageToFirebase);

            task.on('state_changed', (taskSnapshot) => {
                console.log(`${taskSnapshot.bytesTransferred} transfered out of ${taskSnapshot.totalBytes}`);

                setTransfered(
                    Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
                )
            })


            setImageName(name);

            try {
                await task;
                const url = await storageRef.getDownloadURL();
                setUploading(false);
                setTransferedFinished(true);
                return url;
            } catch (error) {
                console.log('Error downloading the image url')
                return null;
            }

        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        setAnimating(true);
        await handleFirebaseUpload();
    };

    const handlePrediction = useCallback(
        async () => {
            const resp = await axios.post('https://ai-backend-project.herokuapp.com/detectFaces', {
                imageName: imageName.toString()
            })

            setResult(resp.data);
            setAnimating(false)
        },
        [imageName],
    )


    useEffect(() => {
        if (image) {
            handleFile(image, 'imagen')
        } else {
            setPreview(null)
        }
    }, [image]);

    useEffect(() => {
        if (video) {
            handleFile(video, 'video')
        } else {
            setVideoPreview(null)
        }
    }, [video]);

    useEffect(() => {
        if (transferedFinished) {
            handlePrediction()
        } else {
            setResult(null)
        }
    }, [transferedFinished, handlePrediction,])

    return (
        <Container>
            <Menu>
                <Submenu>
                    <FileContainer>
                        {
                            preview ? (
                                <ImgFile
                                    src={preview ? preview : 'https://via.placeholder.com/500/0B6EEF?text=F'}
                                    alt="preview"
                                />
                            ) : (
                                videoPreview ? (
                                    <>
                                        <VideoFile ref={videoRef} controls src={videoPreview ? videoPreview : ''} alt="videoPreview" onLoadedMetadata={({ target }) => {
                                            ratio = target.videoWidth / target.videoHeight;
                                            w = target.videoWidth - 100;
                                            h = parseInt(w / ratio, 10);
                                            videoSnapshot.current.width = w;
                                            videoSnapshot.current.height = h;
                                        }} />

                                        <CanvasFile ref={videoSnapshot} width="300" height="300"></CanvasFile>

                                    </>
                                )
                                    : (
                                        <ImgFile
                                            className="card-img-top"
                                            src={'https://via.placeholder.com/500/0B6EEF?text=F'}
                                            alt="preview"
                                        />
                                    ))
                        }
                    </FileContainer>
                    <OptionsContainer>
                        <input
                            className="file-button"
                            style={{ display: 'none' }}
                            type="file"
                            ref={fileInputRef}
                            accept="image/*|video/*"
                            onChange={(event) => {
                                console.log(event)
                                handleChangeFile(event);
                            }}
                            preview={videoPreview}
                        />
                        {
                            videoPreview ? (
                                <ButtonFile onClick={() => handleSnap()}>Snapshot</ButtonFile>
                            ) : null
                        }
                        {
                            preview || videoPreview ? (
                                <>
                                    <ButtonFile
                                        onClick={() => {
                                            setImage(null)
                                            setVideo(null)
                                            setResult(null)
                                            setTransferedFinished(false)
                                        }}
                                    >
                                        Remove File
                                    </ButtonFile>
                                    <ButtonPredict onClick={(e) => handleUpload(e)}>
                                        <PredictText>
                                            Predict
                                        </PredictText>
                                    </ButtonPredict>
                                    <Dots className="dots" color="#727981" size={35} speed={1} animating={animating} />
                                </>
                            ) : (
                                <ButtonFile
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                    }}>
                                    Open File
                                </ButtonFile>
                            )
                        }

                    </OptionsContainer>
                </Submenu>

                <Result>
                    <ResultImageContainer>
                        <ResultImage
                            src={result ? result.imageURL : 'https://via.placeholder.com/500x600/0B6EEF?text=R'}
                            alt="preview"
                        />
                    </ResultImageContainer>
                    <ResultsContainer>
                        {
                            result ? (
                                <DataContainer>
                                    <Data>
                                        <span style={{ fontWeight: 'bold' }}>Age: </span>
                                        <span style={{ fontWeight: 'bold' }}>Success:  </span>
                                        <span style={{ fontWeight: 'bold' }}>Gender:   </span>
                                        <span style={{ fontWeight: 'bold' }}>Success:  </span>
                                    </Data>
                                    <Data>
                                        <span> {result ? result.response[0].age : ''}</span>
                                        <span> {result ? (result.response[0].ageCofidence * 100).toFixed(2) + '%' : ''} </span>
                                        <span>{result ? result.response[0].gender : ''} </span>
                                        <span>{result ? (result.response[0].genderCofidence * 100).toFixed(2) + '%' : ''} </span>
                                    </Data>
                                </DataContainer>
                            ) : null
                        }


                    </ResultsContainer>
                </Result>
            </Menu>
        </Container>
    )
}

export default Main
