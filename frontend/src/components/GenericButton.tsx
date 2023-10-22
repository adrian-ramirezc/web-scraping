import React from 'react'
import Button from '@mui/material/Button'

interface Props {
    title: String
    handleClick: () => void
}

export default function GenericButton(props : Props) {
    const {title, handleClick} = props
    return (
        <Button 
            variant = "contained"
            fullWidth
            onClick = {()=> handleClick()}
            sx = {{backgroundColor:"red"}}
        >
            {title}
        </Button>
    )
}