import "./button.styles.scss";
import { PropsWithChildren } from "react";

export enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
  dropDown = "drop-down",
}

export interface IButtonProps extends PropsWithChildren {
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  buttonType,
  ...otherProps
}: IButtonProps) => {
  return (
    <button
      className={`button-container ${
        buttonType && BUTTON_TYPE_CLASSES[buttonType]
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
