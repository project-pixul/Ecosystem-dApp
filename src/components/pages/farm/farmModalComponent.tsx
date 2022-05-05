import * as React from "react";
import "./farmModalComponent.css";

type ModalProps = {
  setModalState: Function;
};

type ModalState = {};

const FarmModalComponent = (props: ModalProps) => {
  const onClickOutSide = (event: any) => {
    if (event.target.className === "farm-modal") {
      props.setModalState();
    }
  };

  return (
    <div className="farm-modal" onClick={onClickOutSide}>
      <div className="modal-card">
        <div className="modal-title">
          <div className="name">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1649085578/pixulethlogo_gmllax.png"
              alt=""
            />
            PIXUL-ETH
          </div>
          <div>
            APY: <span className="rate">41.5%</span>
          </div>
          <div>
            Liquidity: <span className="rate">$2,045,083</span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="modal-action">
          <div className="action deposit">
            Deposit your LP Tokens
            <span>0.0LP Available</span>
            <div className="token-bar-wrapper">
              <div className="token-bar">
                <div className="fill"></div>
              </div>
              <div className="bar-stat">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            <button>Deposit</button>
          </div>
          <div className="action withdraw">
            Withdraw your LP Tokens
            <span>0.0LP Available</span>
            <div className="token-bar-wrapper">
              <div className="token-bar">
                <div className="fill"></div>
              </div>
              <div className="bar-stat">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            <button>Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmModalComponent;
