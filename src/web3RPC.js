import Web3 from 'web3';
// import { Transaction } from 'ethereumjs-tx/dist/transaction';
const EthereumTx = require('ethereumjs-tx').Transaction;

export default class RPC {
  constructor(provider) {
    this.provider = provider;
  }

  async getChainId() {
    try {
      const web3 = new Web3(this.provider);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      return address;
    } catch (error) {
      return error;
    }
  }
  async getBalance() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error;
    }
  }

  // sendTransaction: eth_sendTransaction;
  async sendTransaction() {
    try {
      const web3 = new Web3(
        'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
      );
      // const privateKeyA =
      //   '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';
      // const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);
      // console.log('privateKeyToAccount : ', accountA.address);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];
      console.log('fromAddress : ', fromAddress);

      // const destination = fromAddress;
      const accountB = web3.eth.accounts.create();
      console.log('createAddress : ', accountB.address);

      //   const amount = web3.utils.toWei('0.001'); // Convert 1 ether to wei
      const amount = web3.utils.toWei('0.00'); // Convert 1 ether to wei
      console.log('amount : ', amount);

      // Submit transaction to the blockchain and wait for it to be mined
      // const receipt = await web3.eth.sendTransaction({
      //   from: fromAddress,
      //   to: accountB.address,
      //   value: amount,
      //   // maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
      //   gasPrice: '0x0',
      //   // maxFeePerGas: '6000000000000', // Max fee per gas
      //   gasLimit: '0x24A22',
      // });
      // console.log('tx receipt: ', receipt);

      const txOptions = {
        from: fromAddress,
        to: accountB.address,
        value: '0x0', // Amount of ETH to transfer
        gasPrice: '0x0', // Set to 0 in GoQuorum networks
        gasLimit: '0x24A22', // Max number of gas units the tx is allowed to use
      };

      console.log('Creating transaction...');
      const pTx = await web3.eth.sendTransaction(txOptions);
      console.log('pTx : ', pTx);
      const receipt = pTx.transactionHash;
      console.log('pTx.transactionHash : ', pTx.transactionHash);

      // web3.eth.sendTransaction(txOptions).then((pTx) => {
      //   console.log('tx transactionHash: ' + pTx.transactionHash);
      // });

      return receipt;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // sendTransaction: eth_sendTransaction;
  // async sendTransaction() {
  //   try {
  //     const web3 = new Web3(
  //       'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
  //     );
  //     // const Tx = EhtTx.Transaction;

  //     const privateKeyA =
  //       '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';
  //     const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);
  //     console.log('accountA : ', accountA);

  //     // const destination = fromAddress;
  //     const accountB = web3.eth.accounts.create();
  //     console.log('createAddress : ', accountB.address);

  //     //   const amount = web3.utils.toWei('0.001'); // Convert 1 ether to wei
  //     // const amount = web3.utils.toWei('0.00'); // Convert 1 ether to wei
  //     // console.log('amount : ', amount);

  //     const rawTxOptions = {
  //       nonce: web3.utils.numberToHex(
  //         await web3.eth.getTransactionCount(accountA.address)
  //       ),
  //       from: accountA.address,
  //       to: accountB.address,
  //       value: '0x0', // Amount of ETH to transfer
  //       gasPrice: '0x0', // Set to 0 in GoQuorum networks
  //       gasLimit: '0x47b760', // Max number of gas units the tx is allowed to use
  //     };

  //     console.log('Creating transaction...');
  //     const tx = new EthereumTx(rawTxOptions);
  //     console.log('Signing transaction...');
  //     tx.sign(Buffer.from(accountA.privateKey.substring(2), 'hex'));
  //     console.log('Sending transaction...');
  //     const serializedTx = tx.serialize();
  //     console.log('serializedTx : ', serializedTx.toString('hex'));

  //     // web3.eth
  //     //   .sendSignedTransaction('0x' + serializedTx.toString('hex'))
  //     //   .then((pTx) => {
  //     //     txHash = pTx.transactionHash;
  //     //     console.log('tx transactionHash: ' + pTx.transactionHash);
  //     //   });
  //     const pTx = await web3.eth.sendSignedTransaction(
  //       '0x' + serializedTx.toString('hex')
  //     );
  //     console.log('pTx: ', pTx);
  //     console.log('tx transactionHash: ' + pTx.transactionHash);
  //     const receipt = pTx.transactionHash;

  //     return receipt;
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // }

  async sendNFT() {
    try {
      const web3 = new Web3(
        'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
      );

      const privateKey =
        '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';

      // プライベートキーからアカウントを作成
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;

      console.log('fromAddress : ', account.address);

      // 送信先アドレスを作成;
      const accountB = web3.eth.accounts.create();
      console.log('createAddress : ', accountB.address);

      // 送信したいNFTのtoken ID
      const tokenId = 2;

      // NFTを送信するのにはコントラクトアドレスとコントラクトABIが必要
      const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';
      const contractABI = require('./MyToken.json').abi;

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Setup transaction options
      const txOptions = {
        from: account.address,
        to: accountB.address,
        gasPrice: '0x0', // Set to 0 in GoQuorum networks
        gasLimit: '0x24A22', // Max number of gas units the tx is allowed to use
      };

      // Transfer token
      let transfer;
      try {
        transfer = await contract.methods
          .transferFrom(account.address, accountB.address, tokenId)
          .send(txOptions);
        console.log(
          `Transferred token with id ${tokenId} to ${accountB.address}`
        );
        console.log('transfer : ', transfer);
      } catch (error) {
        console.error(`Failed to transfer token: ${error}`);
      }

      // Check balances
      try {
        const senderTokenCount = await contract.methods
          .balanceOf(account.address)
          .call();
        console.log(
          `Token count of sender (${account.address}) is ${senderTokenCount}`
        );

        const recipientTokenCount = await contract.methods
          .balanceOf(accountB.address)
          .call();
        console.log(
          `Token count of recipient (${accountB.address}) is ${recipientTokenCount}`
        );
      } catch (error) {
        console.error(`Failed to check balances: ${error}`);
      }

      // Check token's owner
      try {
        const owner = await contract.methods.ownerOf(tokenId).call();
        console.log(`Owner of token with id ${tokenId} is ${owner}`);
      } catch (error) {
        console.error(`Failed to check owner: ${error}`);
      }
      return transfer;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sendContractTransaction() {
    try {
      let tokenConstant;

      tokenConstant = {
        abi: [
          {
            inputs: [
              {
                internalType: 'string',
                name: 'name_',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'symbol_',
                type: 'string',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                indexed: true,
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            name: 'Approval',
            type: 'event',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'approve',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'burn',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'account',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'burnFrom',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'subtractedValue',
                type: 'uint256',
              },
            ],
            name: 'decreaseAllowance',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'addedValue',
                type: 'uint256',
              },
            ],
            name: 'increaseAllowance',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
              },
            ],
            name: 'Paused',
            type: 'event',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'transfer',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
              },
              {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            name: 'Transfer',
            type: 'event',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'sender',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'transferFrom',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
              },
            ],
            name: 'Unpaused',
            type: 'event',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
            ],
            name: 'allowance',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'account',
                type: 'address',
              },
            ],
            name: 'balanceOf',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'decimals',
            outputs: [
              {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'name',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'paused',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'symbol',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'totalSupply',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      };

      const web3 = new Web3(this.provider);

      var tokenContract = new web3.eth.Contract(
        tokenConstant.abi,
        '0x07920F6d18464E56Da438D1ffF38f125C8AB90dD'
      );

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;

      //dsdf
      const response = await tokenContract.methods
        .approve(
          '0xd1d25EAc33401b97568869564ee4ba6e259DCB35',
          '100000000000000000000000000'
        )
        .send(
          {
            from: fromAddress,
          },
          function (error, transactionHash) {
            if (transactionHash) {
              console.log(transactionHash);

              // setApproveCase(3);
            } else {
              console.log(error);
            }
          }
        )
        .on('receipt', async function (receipt) {
          console.log(receipt);
        })
        .on('error', async function (error) {
          console.log(error);
        });
      // Submit transaction to the blockchain and wait for it to be mined
      //   const receipt = await web3.eth.sendTransaction({
      //     from: fromAddress,
      //     to: destination,
      //     value: amount,
      //     maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      //     maxFeePerGas: "6000000000000", // Max fee per gas
      //   });

      return response;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: 'eth_private_key',
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }
}
