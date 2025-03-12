import React, { ReactNode } from "react";

export interface ButtonProspType {
  label: string | React.ReactNode;
  color: "primary" | "success" | "danger" | "warning"|"info";
  className: string;
  onClick?: () => void;
  type?: 'submit' | 'button'
}

export interface ModalPropsType {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export interface InputPropsType {
  label: string;
  type: "text" | "password" | "email";
  className?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required: boolean;
  placeholder?: string;
  name?: string;
}
