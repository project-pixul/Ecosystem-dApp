import * as React from "react";
import "./pixulConvert.css";

export type ConvertProps = {
  convertType: boolean;
  convertToken: boolean;
  tokenBalance: number;
  inputValue: number;
  setInputValue: Function;
};

const PixulConvert = (props: ConvertProps) => {
  const onInputChangeHandler = (e: any) => {
    props.setInputValue(e.target.value);
  };

  const setToMax = (e: any) => {
    props.setInputValue(props.tokenBalance);
  };

  return (
    <div className="conv-card">
      <div className="amount">
        <span>{props.convertType ? "From" : "To"}</span>
        <input
          type="number"
          defaultValue={0}
          value={props.inputValue}
          onChange={onInputChangeHandler}
        />
      </div>
      <div className="status">
        <div className="title">
          <img
            src={
              props.convertToken
                ? "https://res.cloudinary.com/rk03/image/upload/v1652517551/pixulfavicon_dptdpm.png"
                : "https://res.cloudinary.com/rk03/image/upload/v1652517651/xpixulicon_qesgld.svg"
            }
            alt="tokenicon"
          />
          {props.convertToken ? "PIXUL" : "xPIXUL"}
        </div>
        <div className="balance">
          <span>{`Balance: ${props.tokenBalance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
            props.convertToken ? " PIXUL" : " xPIXUL"
          }`}</span>
          <button onClick={setToMax}>Max</button>
        </div>
      </div>
    </div>
  );
};

export default PixulConvert;
