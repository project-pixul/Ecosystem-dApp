import * as React from "react";

import "./walletConnectModal.css";

import { toast } from "react-toastify";
import imgMetamask from '../assets/images/metamask.png'
import imgCoinbase from '../assets/images/coinbase.png'
import imgWalletconnection from '../assets/images/walletconnection.png'

export type ModalProps = {
    invokeFn: Function;
    setWalletConnectModalState: Function;
};

const WalletConnectModal = (props: ModalProps) => {
  const onClickOutside = (e: any) => {
    if (e.target.id === "wallet-modal-wrapper") {
      props.setWalletConnectModalState(false);
    }
  };

  return (
    <div id="wallet-modal-wrapper" onClick={onClickOutside}>
        <div className="wallet-modal-container">
            <div className="wallet-select-container">
                <div className="wallet-option-container" 
                    onClick={() => {
                        props.invokeFn('MetaMask');
                        props.setWalletConnectModalState(false);
                    }}
                >
                    <img className="d-inline-block w-12" src={imgMetamask}></img>
                    <p className="d-inline-block pl-3 font-bold text-white">Meta Mask Wallet</p>
                </div>

                <div className="wallet-option-container" 
                    onClick={() => {
                        props.invokeFn('CoinBase');
                        props.setWalletConnectModalState(false);
                    }}
                >
                    <img className="d-inline-block w-12" src={imgCoinbase}></img>
                    <p className="d-inline-block pl-3 font-bold text-white">Coinbase Wallet</p>
                </div>

                <div className="wallet-option-container" 
                    onClick={() => {
                        props.invokeFn('WalletConnect');
                        props.setWalletConnectModalState(false);
                    }}
                >
                    <img className="d-inline-block w-12" src={imgWalletconnection}></img>
                    <p className="d-inline-block pl-3 font-bold text-white">Wallet Connect</p>
                </div>
            </div>      
        </div>
    </div>
  );
};
export default WalletConnectModal;
