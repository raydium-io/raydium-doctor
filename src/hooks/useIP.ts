import { useEffect } from 'react';
import { useList } from 'react-use';

import { randomString, sleep } from '@/utils';

export const useDnsLeak = () => {
  const [ip, { set: setIp }] = useList([]);
  const [dns, { set: setDns }] = useList([]);

  useEffect(() => {
    const randomId = randomString(16);

    Promise.any(
      [1, 2, 3, 4, 5].map((count) => fetch(`https://${count}_${randomId}.dnsleak.privateinternetaccess.com`))
    ).finally(async () => {
      await sleep(1000);

      fetch(`https://dnsleak.com/results?token=${randomId}&last_id=`).then((res) => {
        res.json().then((content) => {
          const _ip = [];
          const _dns = [];

          for (const info of content) {
            const { ip, user_ip } = info;
            _ip.push(user_ip);
            _dns.push(ip);
          }

          setIp(Array.from(new Set(_ip)));
          setDns(Array.from(new Set(_dns)));
        });
      });
    });
  }, []);
  return { ip, dns };
};
