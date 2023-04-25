import { useEffect, useState } from 'react';
// import { Web3Auth } from "@web3auth/modal";
import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import RPC from './web3RPC';
import 'tailwindcss/tailwind.css';

const clientId =
  'BCftDhpBjch6v0JpXq-5nBtsNWA5Nn0yKUGvhcv_XAUYZnFUYUXMElI1L882suCMsgBnhYh9vX5j4haPgnrZrdw'; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState('');
  const [userData, setUserData] = useState({});
  // console.log('CHAIN_NAMESPACES.EIP155: ', CHAIN_NAMESPACES.EIP155);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x539',
            rpcTarget: 'http://localhost:8545',
          },
        });

        setWeb3auth(web3auth);
        console.log('web3auth', web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
        console.log('web3auth.provider', web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log('web3authProvider: ', web3authProvider);
  };
  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.logout();
    setProvider(web3authProvider);
    setBalance('');
    setAddress('');
    setUserData({});
    setChainId('');
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    console.log('provider: ', provider);
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
    setChainId(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log('receipt :', receipt);
  };
  const sendContractTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendContractTransaction();
    console.log(receipt);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      <button
        onClick={getUserInfo}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Get User Info
      </button>
      <button
        onClick={getChainId}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Get Chain ID
      </button>
      <button
        onClick={getAccounts}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Get Accounts
      </button>
      <button
        onClick={getBalance}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Get Balance
      </button>
      <button
        onClick={sendTransaction}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Send Transaction
      </button>
      <button
        onClick={sendContractTransaction}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Send Approve Transaction
      </button>
      <button
        onClick={getPrivateKey}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Get Private Key
      </button>
      <button
        onClick={logout}
        className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
      >
        Logout
      </button>

      <div id="console" className="whitespace-pre-line">
        <p className="whitespace-pre-line"></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button
      onClick={login}
      className="card bg-purple-500 border border-purple-500 rounded-lg px-8 py-3 font-bold text-black mt-4 flex items-center justify-center w-full max-w-xs"
    >
      Login
    </button>
  );

  return (
    <div
      className="container text-white mx-auto px-4"
      style={{
        textAlign: 'center',
      }}
    >
      <h3 className="text-center mt-8">Web3Auth React Example</h3>
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        </div>
        <div className="w-full md:w-9/12">
          <div className="mt-5 md:mt-20 text-left">
            address: {address}
            <br />
            <br />
            chainId: {chainId}
            <br />
            <br />
            balance: {balance}
            <br />
            <br />
            user: <span className="text-xs">{JSON.stringify(userData)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
