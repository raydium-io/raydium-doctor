import { useEffect, useMemo, useState } from 'react';
import ReactJson from 'react-json-view';

const RpcSpeedItem = ({ endpoint }: { endpoint: string }) => {
  const [speed, setSpeed] = useState<string | number>('-');
  const [statusCode, setStatusCode] = useState<string | number>('-');
  const [reason, setReason] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (endpoint) {
      const start = Date.now();

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getEpochInfo' })
      })
        .then((res) => {
          res.json().then(async (content) => {
            if (res.status === 200) {
              const { result } = content;
              setReason(result);
            } else {
              const { error } = content;
              setReason(error);
              setHasError(true);
            }

            setStatusCode(res.status);
          });
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setSpeed(Date.now() - start);
        });
    }
  }, [endpoint]);

  const itemStatus = useMemo(() => {
    const isError = hasError;
    const isSlow = !hasError && speed > 2000;
    const isNormal = !hasError && speed < 2000 && speed > 1000;
    const isFast = !hasError && speed < 1000;
    return isError ? '🔴' : isSlow ? '🟠' : isNormal ? '🟡' : isFast ? '🟢' : '⚪';
  }, [hasError, speed]);

  return (
    <div>
      <h3 className="mb-1">
        {itemStatus} {statusCode} {endpoint} <span className="text-gray-500">{speed}ms</span>
      </h3>
      <ReactJson
        theme="bright"
        style={{ background: 'transparent' }}
        src={reason}
        name="response"
        collapsed={false}
        displayObjectSize={false}
        displayDataTypes={false}
      />
    </div>
  );
};

export default RpcSpeedItem;
