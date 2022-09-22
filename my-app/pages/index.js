import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";
import {providers, Contract} from "ethers";
import {useEffect, useRef, useState} from "react";
import {WHITELIST_CONTRACT_ADDRESS, abi} from "../constants";

export default function Home() {

    const [walletConnected, setWalletConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    const [joinedWhiteList, setJoinedWhiteList] = useState(false);
    const [numberOfWhiteListed, setNumberOfWhiteListed] = useState(0);

    const web3ModalRef = useRef();

    const getProviderOrSigner = async (needSigner = false) =>
    {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const {chainId} = await web3Provider.getNetwork();

      if(chainId != 5)
      {
        window.alert("Change network to Goerli");
        throw new Error("Change network to Goerli");
      }

      if(needSigner)
      {
        const signer = web3Provider.getSigner();

        return signer;
      }

      return web3Provider;
    };

    const addAddressToWhiteList = async () =>
    {
      try
      {
        const signer = await getProviderOrSigner(true);

        const whitelistContract = new Contract(
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          signer
        );

        const tx = await whitelistContract.addAddressToWhiteList();
        setLoading(true);
        await tx.wait();
        setLoading(false);

        await getNumberOfWhiteListed();
        setJoinedWhiteList(true);
      }

      catch(err)
      {
        console.log(err);
      }
    };


    const getNumberOfWhiteListed = async () => 
    {
      try{

        const provider = await getProviderOrSigner();

        const whiteListContract = new Contract
        (
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          provider
        );

        const _numberOfWhiteListed = await whiteListContract.numberOfAddressWhiteListed();
        setNumberOfWhiteListed(_numberOfWhiteListed);
      }

      catch(err)
      {
        console.log(err);
      }
    };

    const checkIfAddressInWhiteList = async ()=>
    {
       try
       {
          const signer = await getProviderOrSigner(true);
          const whiteListContract = new Contract(
            WHITELIST_CONTRACT_ADDRESS,
            abi,
            signer
          );

          const address = await signer.getAddress();

          const _joinedWhiteList = await whiteListContract.whiteListedAddress(address);

          setJoinedWhiteList(_joinedWhiteList);
       }
       catch(err)
       {
        console.log(err);
       }
    }


    const connectWallet = async () =>
    {
      try{

        await getProviderOrSigner();
        setWalletConnected(true);

        checkIfAddressInWhiteList();
        getNumberOfWhiteListed();
      }

      catch(error)
      {
        console.log(error);
      }
    }
}
