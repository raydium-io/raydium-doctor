import { useEffect, useState } from 'react';
import { useList } from 'react-use';

export const useRemoteConfig = (isDev = false) => {
  const [remoteConfigStatus, setRemoteConfigStatus] = useState('-');
  const [rpcEndpoints, { set: setRpcEndpoints }] = useList([]);
  const [rpcStrategy, setRpcStrategy] = useState('-');

  useEffect(() => {
    fetch('https://api.raydium.io/config?v=1.1.0')
      .then((res) => {
        res.json().then((content) => {
          const { strategy, rpcs } = content;

          let endpoints = [];
          if (isDev) {
            endpoints = [
              'https://raydium.rpcpool.com',
              'https://api.mainnet-beta.solana.com',
              'https://solana-api.projectserum.com',
              'https://free.rpcpool.com',
              'https://api.rpcpool.com'
            ];
          } else {
            endpoints = rpcs.map((rpc) => rpc.url);
          }

          setRpcEndpoints(endpoints);
          setRpcStrategy(strategy.toUpperCase());

          setRemoteConfigStatus('🟢');
        });
      })
      .catch(() => {
        setRemoteConfigStatus('🔴');
      });
  }, []);
  return { remoteConfigStatus, rpcEndpoints, rpcStrategy };
};
