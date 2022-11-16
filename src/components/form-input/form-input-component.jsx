import React from "react";
import "./form-input.styles.scss";
export default function formInputComponent({ label, ...props }) {
  return (
    <div className="group">
      <input className="form-input" {...props} />
      {label && (
        <label
          className={`${props.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
