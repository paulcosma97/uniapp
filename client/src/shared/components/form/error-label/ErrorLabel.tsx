import React from "react";
import './ErrorLabel.css'

export interface ErrorLabelProps {
    text: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = props => <div className="form-error-label"><em>{props.text}</em></div>;
export default ErrorLabel;