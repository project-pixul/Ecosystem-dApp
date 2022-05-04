import * as React from "react";
import "./pixulConvert.css";
import { BaseComponent } from "../../shellInterfaces";

export type ConvertState = {};

export type ConvertProps = {
  convertType: boolean;
  convertToken: boolean;
  tokenBalance: number;
  tokenValue?: number;
};

const PixulConvert = (props: ConvertProps) => {
  return (
    <div className="conv-card">
      <div className="amount">
        <span>{props.convertType ? "From" : "To"}</span>
        <input
          type="number"
          defaultValue={0}
          value={props.tokenValue}
          disabled={props.convertType ? false : true}
        />
      </div>
      <div className="status">
        <div className="title">
          <img
            src={
              props.convertToken
                ? "/images/pixulfavicon.png"
                : "/images/xpixulicon.svg"
            }
            alt="tokenicon"
          />
          {props.convertToken ? "PIXUL" : "xPIXUL"}
        </div>
        <div className="balance">
          <span>{`Balance: ${props.tokenBalance} ${
            props.convertToken ? " PIXUL" : " xPIXUL"
          }`}</span>
          <button>Max</button>
        </div>
      </div>
    </div>
  );
};

export default PixulConvert;
