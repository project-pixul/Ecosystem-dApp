import axios from 'axios';
import { PixulAddress, TreasuryWalletAddress } from './pixul';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

type PriceInfo = { 
	pixul: { 
		usd: number, 
		bnb: number 
	}, 
	bnb: { 
		usd: number
	},
	marketCap: {
		usd: number
	}
	totalSupply: {
		value: number
	}
};

export class PixulStatistics {

	private readonly _web3: Web3;
	private readonly _pixul: Contract;
	private readonly _usd: Contract;

	private _prices?: PriceInfo = null;
	private _treasuryWalletBalance?: number;

	constructor() {

		const erc20: any = [
			{
				"constant": true,
				"inputs": [{ "name": "_owner", "type": "address" }],
				"name": "balanceOf",
				"outputs": [{ "name": "balance", "type": "uint256" }],
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "decimals",
				"outputs": [{ "name": "", "type": "uint8" }],
				"type": "function"
			}
		];

		this._web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
		this._usd = new this._web3.eth.Contract(erc20, "0xe9e7cea3dedca5984780bafc599bd69add087d56");
		this._pixul = new this._web3.eth.Contract(erc20, PixulAddress);
	}

	public async refresh() {
		const prices: PriceInfo = await this.getPrices(false);

		const bnbBalance: number = +this._web3.utils.fromWei(await this._web3.eth.getBalance(TreasuryWalletAddress), 'ether');
		const usdBalance: number = await this._usd.methods.balanceOf(TreasuryWalletAddress).call() * Math.pow(10, -(await this._usd.methods.decimals().call()));
		const pixulBalance: number = await this._pixul.methods.balanceOf(TreasuryWalletAddress).call() * Math.pow(10, -(await this._pixul.methods.decimals().call()));

		this._treasuryWalletBalance = usdBalance + (bnbBalance * prices.bnb.usd) + (pixulBalance * prices.pixul.usd);
		this._prices = prices;
	}

	public get treasuryWalletBalance(): number {
		return this._treasuryWalletBalance || 0;
	}
	public get pixulBnbPrice(): number {
		return (this._prices || {}).pixul.bnb;
	}
	public get pixulUsdPrice(): number {
		return (this._prices || {}).pixul.usd;
	}
	public get marketCapUsd(): number {
		return (this._prices || {}).marketCap.usd;
	}
	public get totalSupply(): number {
		return (this._prices || {}).totalSupply.value;
	}
	
	public usdToPixul(usdAmount?: number): number {
		return (usdAmount/(this._prices || {}).pixul.usd);
	}
	
	public bnbToPixul(bnbAmount?: number): number {
		return (bnbAmount/(this._prices || {}).pixul.bnb);
	}

	private async retrievePriceApi() {
		console.log("Retrieving prices...");
		return (await (await fetch("NEED CMC API")).json());
	}

	private async getPrices(force: boolean): PriceInfo {
		if (!!this._prices && !force) {
			return this._prices;
		}
		const a = await this.retrievePriceApi();
		return {
			pixul: {
				usd: a.lastPrices.pixulusd,
				bnb: a.lastPrices.pixulbnb,
			},
			bnb: {
				usd: a.lastPrices.pixulusd
			},
			marketCap: {
				usd: a.lastPrices.marketcapusd,
			},
			totalSupply: {
				value: a.totalSupply,
			}
		};
	}
}
