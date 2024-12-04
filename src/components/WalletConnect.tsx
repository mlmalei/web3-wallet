"use client";
import React, { useState } from "react";

type WalletType = "phantom" | "okx";

const WalletConnect: React.FC = () => {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [connecting, setConnecting] = useState<boolean>(false);
	const [walletError, setWalletError] = useState<string | null>(null);

	const connectWallet = async (walletType: WalletType) => {
		setConnecting(true);
		setWalletError(null);

		try {
			let response;

			if (walletType === "phantom") {
				if (window.solana && window.solana.isPhantom) {
					response = await window.solana.connect();
					setWalletAddress(response.publicKey.toString());
				} else {
					throw new Error("Phantom wallet is not installed.");
				}
			} else if (walletType === "okx") {
				if (window.okxwallet) {
					response = await window.okxwallet.solana.connect();
					setWalletAddress(response.publicKey.toString());
				} else {
					throw new Error("OKX wallet is not installed.");
				}
			}
		} catch (error: any) {
			setWalletError(error.message || "Failed to connect wallet.");
			console.error(error);
		} finally {
			setConnecting(false);
		}
	};

	return (
		<>
			<div className="flex flex-col items-center space-y-4">
				<h1 className="text-2xl font-bold">Connect Your Wallet</h1>
				<div className="flex space-x-4">
					<button
						onClick={() => connectWallet("phantom")}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						disabled={connecting}
					>
						Connect Phantom
					</button>
					<button
						onClick={() => connectWallet("okx")}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
						disabled={connecting}
					>
						Connect OKX
					</button>
				</div>

				{walletAddress && (
					<div className="text-lg">
						Connected Wallet:
						<span className="font-semibold">{walletAddress}</span>
					</div>
				)}
				{walletError && <div className="text-red-500">{walletError}</div>}
			</div>
		</>
	);
};

export default WalletConnect;
