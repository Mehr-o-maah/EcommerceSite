import "./form-input.styles.scss";
import { FC, InputHTMLAttributes } from "react";

type formInputComponentProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputComponent: FC<formInputComponentProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="group">
      <input className="form-input" {...props} />
      {label && (
        <label
          className={`${
            Boolean(
              props.value &&
                typeof props.value === "string" &&
                props.value.length
            )
              ? "shrink"
              : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
