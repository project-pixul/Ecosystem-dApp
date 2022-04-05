import * as React from "react";
import { BaseComponent } from "../../shellInterfaces";
import "./farmModalComponent.css";

type ModalProps = {
  setModalState: Function;
};

type ModalState = {};

class FarmModalComponent extends BaseComponent<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.onClickOutSide = this.onClickOutSide.bind(this);
  }

  onClickOutSide(event: any) {
    if (event.target.className === "farm-modal") {
      this.readProps().setModalState();
    }
  }

  render() {
    return (
      <div className="farm-modal" onClick={this.onClickOutSide}>
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
  }
}

export default FarmModalComponent;
