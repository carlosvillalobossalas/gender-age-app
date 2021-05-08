import React, { useEffect, useRef, useState } from 'react'
import { storage } from '../firebase/firebase-config';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from '@material-ui/lab/Skeleton';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css'

const axios = require('axios').default;

const Main = () => {

    const fileInputRef = useRef();

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [imageName, setImageName] = useState('');
    const [transfered, setTransfered] = useState(0)
    const [uploading, setUploading] = useState(false);
    const [transferedFinished, setTransferedFinished] = useState(false)
    const [result, setResult] = useState();
    const [animating, setAnimating] = useState(false)

    const handleChangeFile = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file)
        } else {
            console.log('No es imagen')
            setImage(null);
        }
    }

    const handleFile = (image) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(image);
    }

    const handleFirebaseUpload = async () => {

        console.log('start of upload...')

        if (image) {
            setUploading(true);
            setTransfered(0);

            const name = uuidv4();
            const filename = name + '.jpg';

            const storageRef = storage.ref(`uploaded/${filename}`);
            const task = storageRef.put(image);

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
    }

    const handlePrediction = () => {
        // console.log('Image Name', imageName)
        axios.post('https://ai-backend-project.herokuapp.com/detectFaces', {
            imageName: imageName.toString()
        })
            .then((res) => {
                console.log((res.data.response[0].ageCofidence * 100).toFixed(2))
                setResult(res.data);
            })
            .catch((e) => console.log('Prediciont Failed', e))
            .finally(() => setAnimating(false))

    }

    useEffect(() => {
        if (image) {
            handleFile(image)
        } else {
            setPreview(null)
        }
    }, [image]);

    useEffect(() => {
        if (transferedFinished) {
            handlePrediction()
        } else {
            setResult(null)
        }
    }, [transferedFinished])

    return (
        <div className="container">
            <div className="image-container">
                <div className="image-container-1">
                    <div className="card" >
                        <img
                            className="card-img-top"
                            src={preview ? preview : 'https://via.placeholder.com/500/F55F1E?text=Picture'}
                            alt="preview"
                        />

                    </div>
                    <div className="select-image">
                        <input
                            className="file-button"
                            style={{ display: 'none' }}
                            type="file"
                            ref={fileInputRef}
                            accept="image/"
                            onChange={(event) => { handleChangeFile(event); }}
                        />
                        {
                            preview ? (
                                <button
                                    className="image-button"
                                    onClick={() => {
                                        setImage(null)
                                        setResult(null)
                                        setTransferedFinished(false)
                                    }}
                                >
                                    Remove Image
                                </button>
                            ) : (
                                <button
                                    className="image-button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                    }}>
                                    Open Image
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-prediction" onClick={(e) => handleUpload(e)}>Predict</button>
                    <Dots className="dots" color="#727981" size={35} speed={1} animating={animating} />
                </div>

                <div className="image-container-2">
                    <div className="card">
                        {
                            result ? (

                                <img
                                    className="card-img-top"
                                    src={result ? result.imageURL : 'https://via.placeholder.com/500x600/0B6EEF?text=Imagen'}
                                    alt="preview" />
                            ) : (
                                <Skeleton variant="rect" height={'400px'} />
                            )
                        }
                        {
                            result ? (
                                <div className="card-body">
                                    <span><span style={{ fontWeight: 'bold' }}>Age: </span> {result ? result.response[0].age : ''}</span>
                                    <span><span style={{ fontWeight: 'bold' }}>Success:  </span> {result ? (result.response[0].ageCofidence * 100).toFixed(2) + '%' : ''} </span>
                                    <span><span style={{ fontWeight: 'bold' }}>Gender:   </span>{result ? result.response[0].gender : ''} </span>
                                    <span><span style={{ fontWeight: 'bold' }}>Success:  </span>{result ? (result.response[0].genderCofidence * 100).toFixed(2) + '%' : ''} </span>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
