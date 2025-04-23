import React, { ReactNode } from "react";

export interface ButtonProspType {
  label: string | React.ReactNode;
  color: "primary" | "success" | "danger" | "warning" | "info";
  className: string;
  onClick?: () => void;
  defualt?: boolean;
  type?: "submit" | "button";
}

export interface ModalPropsType {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  size?: string;
}

export interface InputPropsType {
  label: string;
  type: "text" | "password" | "email" | "number" | "textArea";
  className?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;  
  error?: string;
  required: boolean;
  placeholder?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  Value?: string;
  min?: number;
  max?: number;
}
