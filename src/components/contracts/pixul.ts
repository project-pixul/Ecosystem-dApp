import {Wallet} from '../wallet';
import {Contract} from 'web3-eth-contract';
// import { ethers } from 'ethers';
import * as web3 from 'web3-utils';

export const PixulAddress = "";
export const TreasuryWalletAddress = "0x06B0B2697b01DC18c6901DC025df284fe13D53d9"

export class Pixul {
	private readonly _wallet: Wallet;
	private readonly _contract: Contract;

	private _balance: number = 0;
	private _stake: number = 0;
	private _pendingRewards: number = 0;

	constructor(wallet: Wallet) {
		this._wallet = wallet;
		this._contract = wallet.connectToContract(PixulAddress, require('./pixul.abi.json'));
	}

	get contract(): Contract {
		return this._contract;
	}

	get wallet(): Wallet {
		return this._wallet;
	}
	get balance(): number {
		return this._balance;
	}
	get stakedBalance(): number {
		return this._stake;
	}
	get pendingStakeRewards(): number {
		return this._pendingRewards;
	}

	async stake(amount: number): Promise<void> {
		await this.refresh();

		if (this._balance >= amount) {
			await this._contract.methods.stakeIn(web3.toWei(String(amount - 0.0001),'gwei')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your xPixul balance is not sufficient to stake this amount';
		}
	}
	async unstakeAndClaim(amount: number): Promise<void> {
		await this.refresh();

		if (this._stake >= amount) {
			await this._contract.methods.withdrawStake(web3.toWei(String(amount - 0.0001),'gwei')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your staked xPixul balance is not sufficient to unstake this amount';
		}
	}
	async claim(): Promise<void> {
		await this._contract.methods.claimStakingRewards().send({'from': this._wallet.currentAddress});
		await this.refresh();
	}

	async refresh(): Promise<void> {
		this._balance = web3.fromWei(await this._contract.methods.balanceOf(this._wallet.currentAddress).call(), "gwei");
		this._stake = web3.fromWei(await this._contract.methods.stakedBalanceOf(this._wallet.currentAddress).call(), "gwei");
		this._pendingRewards = web3.fromWei(await this._contract.methods.pendingRewards(this._wallet.currentAddress).call(), "gwei");
	}
}
