import React from 'react'
import { Anchor } from '../styles'
import { CONSTANTS } from '../CONSTANTS'

export function Menu(props) {
    return (
        <span>
            <Anchor href="/">{CONSTANTS.HOME}</Anchor>
            <Anchor href="/view">{CONSTANTS.VIEW}</Anchor>
            <Anchor href="/about">{CONSTANTS.INFO_TEXT}</Anchor>
        </span>
    )
}
