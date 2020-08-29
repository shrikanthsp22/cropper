import React, { Component } from 'react'
import { UploadedImageContainer, LoaderComponent, DeleteButton, DeleteButtonWrapper } from '../styles'
import { storage } from '../firebase/index'
import { isEmpty } from 'lodash'
import Loader from 'react-loader-spinner'
import { CONSTANTS } from '../CONSTANTS'

export default class Showuploadedimages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allImageUrls: [],
            noImagesFound: false

        }
    }

    componentDidMount() {
        const listRef = storage.ref().child("/images");
        listRef.listAll().then((res) => {
            const { items } = res;
            if (isEmpty(items)) {
                this.setState({ noImagesFound: true })
                return
            }

            items.forEach(item => {
                const { allImageUrls = [] } = this.state;
                let newArrayOfImageUrls = allImageUrls;
                item.getDownloadURL().then(result => {
                    newArrayOfImageUrls.push({ url: result, itemName: item })
                    this.setState({ allImageUrls: newArrayOfImageUrls })
                })

            })
        })
    }

    render() {
        const { allImageUrls, noImagesFound } = this.state;
        if (noImagesFound) {
            return (
                <h2 style={{ textAlign: 'center' }}>{CONSTANTS.NO_IMAGES}</h2>
            )
        }

        if (isEmpty(allImageUrls)) {
            return (
                <LoaderComponent><Loader type="TailSpin" color="black" height={80} width={80} /></LoaderComponent>
            )
        }
        return (
            <UploadedImageContainer>

                {
                    allImageUrls.map(item => <div>
                        <div style={{ textAlign: 'center' }}>
                            <img style={{ width: '400px', height: '400px', objectFit: 'cover' }} src={item.url}></img>
                        </div>
                        <br />
                        <DeleteButtonWrapper>
                            <DeleteButton onClick={() => {
                                item.itemName.delete()
                                window.location.reload(true)
                            }}>{CONSTANTS.DELETEBUTTON}</DeleteButton>
                        </DeleteButtonWrapper>
                    </div>)
                }

            </UploadedImageContainer>
        )
    }
}
