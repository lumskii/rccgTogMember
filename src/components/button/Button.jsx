import React from 'react'
import { Button } from '@mui/material'

export default function MuiButton({ label, color, variant, onClick, disabled }) {
  return (
    <Button
        color={color || "primary"}
        variant={variant || "contained"}
        onClick={onClick}
        disabled={disabled}
    >
        {label}
    </Button>
  )
}
