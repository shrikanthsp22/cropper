import React from 'react'
import { ListItem } from '../styles'
import { CONSTANTS } from '../CONSTANTS'


export function About() {
    const { INFO1, INFO2, INFO3, INFO4, INFO5, INFO6, INFO7, INFO8 } = CONSTANTS;
    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>About <i style={{ color: 'orange' }}>{CONSTANTS.HEADER}</i></h1>
            <ul>
                <ListItem>{INFO1}</ListItem>
                <ListItem style={{ backgroundColor: '#30be16' }}>{INFO2}</ListItem>
                <ListItem>{INFO3}</ListItem>
                <ListItem style={{ backgroundColor: '#30be16' }}>{INFO4}</ListItem>
                <ListItem>{INFO5}</ListItem>
                <ListItem style={{ backgroundColor: '#30be16' }}>{INFO6}</ListItem>
                <ListItem>{INFO7}</ListItem>
                <ListItem style={{ backgroundColor: '#30be16' }}>{INFO8}</ListItem>
            </ul>
        </div>
    )
}
