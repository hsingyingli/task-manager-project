import { forwardRef } from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { Input, Container } from './input_panel_style';
const Input_panel = forwardRef((props, ref) => {
  const {htmlFor, text, type, value, onChange, showError=false, errorText=false, ...rest} = props
  return (
    <Container showError={showError}>
      <label htmlFor={htmlFor}>{text}</label>
      <Input>
        <FaArrowRight color="deeppink" />
        <input
          type={type}
          id={htmlFor}
          autoComplete="off"
          value={value}
          required
          onChange={onChange}
          ref={ref}
          {...rest}
        />
      </Input>
      <p>{errorText}</p>
    </Container>
  )}
);

export default Input_panel
