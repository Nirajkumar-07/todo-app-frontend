import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

/**
 * @typedef {"outlined" | "filled" | "standard"} VariantType
 */

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 * variant?: VariantType,
 * label?: string,
 * error?: boolean,
 * helperText?: React.ReactNode
 * }} PasswordTextFieldProps
 */

/**
 * @param {PasswordTextFieldProps} props
 */

function PasswordTextField(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="password"
                tabIndex={-1}
                edge="end"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}

export default PasswordTextField;
