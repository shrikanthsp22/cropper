import React, { Component } from 'react';
import { DragDropArea, ImageWrapper, Cavas, Button, ButtonWrapper, SubHeader } from '../styles';
import ReactCrop from 'react-image-crop'
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import { CONSTANTS } from '../CONSTANTS';
import { downloadBase64File, base64StringtoFile, image64toCanvasRef, extractImageFileExtensionFromBase64 } from '../utils';
import './main.styles.css'
import { storage } from '../firebase/index'
import DownloadImage from '../images/downloadIcon.png'
import UploadImage from '../images/uploadIcon.png'
import '../Pages/main.styles.css'

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg';
const imageMaxSize = 5000000 //limiting file size in bytes to avoid space wastage on cloud

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.imagePreviewCanvasRef = React.createRef()
        this.imageCanvasRef0 = React.createRef();
        this.imageCanvasRef1 = React.createRef();
        this.imageCanvasRef2 = React.createRef();
        this.imageCanvasRef3 = React.createRef();

        this.state = {
            imgSrc: null,
            imageDimensions: {
                height: 9999999999,
                width: 99999999999,
            },
            imageName: '',
            file: null,
            validImageDimension: true,
            show: false,
            showCustomCrop: false,
            crop: {
                // aspect: 1 / 1
            },
            cropDimensions: [
                {
                    name: 'horizontal',
                    x: 0,
                    y: 0,
                    width: 755,
                    height: 450
                },
                {
                    name: 'vertical',
                    x: 0,
                    y: 0,
                    width: 365,
                    height: 450
                },
                {
                    name: 'horizontal_Small',
                    x: 0,
                    y: 0,
                    width: 365,
                    height: 212
                },
                {
                    name: 'gallery',
                    x: 0,
                    y: 0,
                    width: 380,
                    height: 380
                }
            ]
        }
    }

    handleImageLoaded = (img) => {

        let validImageDimensions = false;
        if (img.naturalHeight === 1024 && img.naturalWidth === 1024) {
            validImageDimensions = true;
        } else {
            window.location.reload(true)
            alert("Invalid Image!Check our 'Info' section for allowed file types")
        }
        this.setState({
            imageDimensions: {
                height: img.naturalHeight,
                width: img.naturalWidth
            }, validImageDimension: validImageDimensions
        })

    }

    handleOnCropChange = (crop) => {
        this.setState({ crop: crop })
    };

    showDifferentCroppedImages = (cropDimensions) => {

        const canvasRef0 = this.imageCanvasRef0.current;
        const canvasRef1 = this.imageCanvasRef1.current;
        const canvasRef2 = this.imageCanvasRef2.current;
        const canvasRef3 = this.imageCanvasRef3.current;

        const { imgSrc } = this.state;

        image64toCanvasRef(canvasRef0, imgSrc, this.state.cropDimensions[0])
        image64toCanvasRef(canvasRef1, imgSrc, this.state.cropDimensions[1])
        image64toCanvasRef(canvasRef2, imgSrc, this.state.cropDimensions[2])
        image64toCanvasRef(canvasRef3, imgSrc, this.state.cropDimensions[3])
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        this.setState({ showCustomCrop: true })
        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)


    }

    handleDownloadClick = (event, canvasRefParam) => {
        event.preventDefault();
        const canvasRef = canvasRefParam.current;
        const { imgSrc } = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension)
        const fileName = "Preview." + fileExtension;
        base64StringtoFile(imageData64, fileName)
        downloadBase64File(imageData64, fileName)
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const { name } = currentFile;
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;


            if (currentFileSize > imageMaxSize) {
                alert("File size too high for upload")
                return false
            } else {
                const myFilereader = new FileReader();
                myFilereader.addEventListener('load', () => {
                    this.setState({ imgSrc: myFilereader.result, imageName: name, file: currentFile })
                }, false);
                myFilereader.readAsDataURL(currentFile)
                return true
            }
        }

    }


    handleUploadClick = (refParam, type) => {
        const { imageName = '', imgSrc } = this.state;
        const canvasRef = refParam.current;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension)
        const fileName = `${imageName}_${type}.` + fileExtension;

        const listRef = storage.ref().child("/images");
        listRef.listAll().then((res) => {
            let isAlreadyUploadedImage = false;
            const { items } = res;
            items.forEach(itemval => {
                if (itemval.name === fileName) {
                    isAlreadyUploadedImage = true;
                    alert("Already uploaded!")
                }
            })
            if (!isAlreadyUploadedImage) {
                const uploadableFile = base64StringtoFile(imageData64, fileName);
                const uploadTask = storage.ref(`images/${fileName}`).put(uploadableFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const inProgress = snapshot.bytesTransferred === snapshot.totalBytes;
                        if (inProgress) {
                            alert("Upload complete. Find the uploaded Images in the Uploaded images tab")
                        }
                    },
                    (error) => {
                        alert(error.message)
                    },
                    // () => {
                    //     storage.ref('images').child(imageName).getDownloadURL().then(url => {
                    //     })
                    // }
                )
            }
        })

    }
    // Get Buttons for actions
    getButtons = (ref, type) => {
        return (
            <ButtonWrapper>
                <Button onClick={(e) => this.handleDownloadClick(e, ref)}><span>{CONSTANTS.DOWNLOAD} </span><img height="12px" src={DownloadImage} alt="" /></Button>

                <Button onClick={() => this.handleUploadClick(ref, type)} style={{ marginLeft: '5px' }}><span>{CONSTANTS.UPLOAD}</span><img height="12px" src={UploadImage} alt="" /></Button>
            </ButtonWrapper>
        )
    }
    render() {
        const { imgSrc, show, validImageDimension } = this.state;

        return (
            <div>
                {imgSrc && validImageDimension && <>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <a className="anchorButton" href="#defaultcrops" onClick={() => {
                            this.setState({ show: true }, () => this.showDifferentCroppedImages())

                        }}>{CONSTANTS.DEFAULTCROPS}</a>
                    </div>
                    <br />
                    <p style={{ textAlign: 'center' }}>{CONSTANTS.CUSTOM_CROP}</p>

                </>}
                {imgSrc && validImageDimension && <ImageWrapper>
                    <ReactCrop
                        src={imgSrc}
                        crop={this.state.crop}
                        onImageLoaded={this.handleImageLoaded}
                        onComplete={this.handleOnCropComplete}
                        onChange={this.handleOnCropChange}
                    />
                    <br />

                    <br />
                    {
                        this.state.showCustomCrop && <>
                            <SubHeader>{CONSTANTS.CUSTOM_CROP_PREVIEW}</SubHeader>
                            <Cavas ref={this.imagePreviewCanvasRef}></Cavas>
                            {this.getButtons(this.imagePreviewCanvasRef, Math.random() * 100000)}
                            <br />
                        </>}

                    {
                        imgSrc && show && <div id="defaultcrops">
                            <SubHeader>{CONSTANTS.HORIZONTAL}</SubHeader>
                            <Cavas ref={this.imageCanvasRef0}></Cavas>
                            {this.getButtons(this.imageCanvasRef0, 'horizontal')}

                            <SubHeader>{CONSTANTS.VERTICAL}</SubHeader>
                            <Cavas ref={this.imageCanvasRef1}></Cavas>
                            {this.getButtons(this.imageCanvasRef1, 'vertical')}

                            <SubHeader>{CONSTANTS.HORIZONTAL_SMALL}</SubHeader>
                            <Cavas ref={this.imageCanvasRef2}></Cavas>
                            {this.getButtons(this.imageCanvasRef2, 'horizontalSmall')}

                            <SubHeader>{CONSTANTS.GALLERY}</SubHeader>
                            <Cavas ref={this.imageCanvasRef3}></Cavas>
                            {this.getButtons(this.imageCanvasRef3, 'gallery')}
                            <br />
                            <br />
                        </div>
                    }

                </ImageWrapper>}

                {!imgSrc && <div style={{ width: '20%', margin: '0px auto' }}>
                    <Dropzone maxSize={imageMaxSize} accept={acceptedFileTypes} onDrop={acceptedFiles => this.handleOnDrop(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <DragDropArea>{CONSTANTS.DROP_HERE}</DragDropArea>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>}
            </div >
        )
    }
}
export default HomePage;