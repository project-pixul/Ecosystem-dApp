import {Wallet} from '../wallet';
import {Contract} from 'web3-eth-contract';
import {Pixul} from './pixul';

export class PixulLottery {

	private static readonly address: string = "";

	private readonly _ticketPrice = 10**9;

	private readonly _wallet: Wallet;
	private readonly _contract: Contract;
	private readonly _pixul: Pixul;

	private _tickets: number = 0;
	private _jackpot: number = 0;
	private _totalTickets: number = 0;
	private _drawNumber: number = 0;
	private _lastWinner: string = null;

	constructor(wallet: Wallet) {
		if (!wallet.isConnected) {
			throw 'Wallet must be connected before this action can be executed.';
		}

		this._wallet = wallet;
		this._contract = wallet.connectToContract(PixulLottery.address, require('./lottery.abi.json'));
		this._pixul = new Pixul(wallet);
	}

	get wallet(): Wallet {
		return this._wallet;
	}
	get pixul(): Pixul {
		return this._pixul;
	}
	get tickets(): number {
		return this._tickets;
	}
	get ticketPrice(): number {
		return this._ticketPrice;
	}
	get jackpot(): number {
		return this._jackpot;
	}
	get totalTickets(): number {
		return this._totalTickets;
	}
	get lastWinner(): string {
		return this._lastWinner;
	}
	get drawNumber(): number {
		return this._drawNumber;
	}

	async refresh(): Promise<void> {
		await this._pixul.refresh();

		const dec = (1.0 / 10**9)

		this._tickets = await this._contract.methods.ticketBalanceOf(this._wallet.currentAddress).call();
		this._jackpot = await this._contract.methods.currentJackpot().call() * dec

		this._drawNumber = await this._contract.methods.currentDraw().call();

		this._totalTickets = await this._contract.methods.ticketsPerRound(this._drawNumber).call();
		this._lastWinner = await this._contract.methods.winnerOfRound(this._drawNumber - 1).call();

	}
	async buyTicket(): Promise<string> {
		await this._pixul.refresh()

		const rawPrice: number = this._ticketPrice * 10 ** 9;

		if (this._pixul.balance * 10 ** 9 >= rawPrice) {
			const allowance = +(await this._pixul.contract.methods.allowance(this._wallet.currentAddress, PixulLottery.address).call());

			if (allowance < rawPrice) {
				// we need to give allowance to lottery contract first
				const allowance = `${BigInt(2**256) - BigInt(1)}`;
				await this._pixul.contract.methods.approve(PixulLottery.address, allowance).send({'from': this._wallet.currentAddress});
			}

			const receipt = await this._contract.methods.getTicket().send({'from': this._wallet.currentAddress});
			return receipt.events.NewTicket.returnValues.hash;
		}
		else {
			throw 'Your Pixul balance is not sufficient to buy a ticket';
		}
	}
}
