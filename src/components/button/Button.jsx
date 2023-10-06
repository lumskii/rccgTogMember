import React from 'react'

export default function Button({ label, color, variant, onClick, disabled }) {
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
