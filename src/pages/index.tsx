import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimeout } from 'react-use';

import Footer from '@/components/footer';
import Header from '@/components/header';
import RpcSpeedItem from '@/components/rpcSpeedItem';
import { useDnsLeak } from '@/hooks/useIP';
import { useRemoteConfig } from '@/hooks/useRemoteConfig';

const Index = () => {
  const { t } = useTranslation();

  const [isDev] = useState(window.location.pathname !== '/');

  const { remoteConfigStatus, rpcStrategy, rpcEndpoints } = useRemoteConfig(isDev);
  const { ip, dns } = useDnsLeak();

  const [dnsLeakTimeout] = useTimeout(10 * 1000);
  const [showNetease, setNeteaseShow] = useState(false);

  return (
    <div className="container mx-auto px-5 flex flex-auto flex-col">
      <Header />

      <h2 className="mb-5">{t('scenes')}</h2>

      <div className="flex items-center">
        <div>
          <h3 className="mb-3">
            {t('ip')}: {ip.length > 0 ? ip.join(', ') : '-'}
          </h3>
          <h3 className="mb-3">
            {t('dns')}: {dns.length > 0 ? dns.join(', ') : '-'}
          </h3>
        </div>
        {(isDev || (dnsLeakTimeout() && ip.length === 0 && dns.length === 0)) && (
          <button
            className="ml-4 px-6 py-1.5 text-primary border-primary border hover:bg-primary hover:text-black rounded-full transition-colors focus:outline-none"
            onClick={() => setNeteaseShow(true)}
          >
            {t('query-network-config')}
          </button>
        )}
      </div>

      {showNetease && (
        <h3 className="flex mb-2">
          {t('network')}:{' '}
          <iframe id="netease" className="h-40 bg-white" style={{ marginTop: -15 }} src="https://nstool.netease.com" />
        </h3>
      )}

      <h3 className="mb-3">
        {t('loading-remote-config')}: {remoteConfigStatus}
      </h3>
      <h3 className="mb-3">
        {t('rpc-strategy')}: {rpcStrategy}
      </h3>

      <h2 className="font-bold text-xl mt-2 mb-4 text-primary">{t('rpc-check')}</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {rpcEndpoints.map((endpoint) => (
          <RpcSpeedItem key={endpoint} endpoint={endpoint} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
