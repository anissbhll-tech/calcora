import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface SubnetCidrCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SubnetCidrCalculator: React.FC<SubnetCidrCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.1');
  const [cidrPrefix, setCidrPrefix] = useState<string>('24');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.ipAddress !== undefined) setIpAddress(String(initialPreset.ipAddress));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setIpAddress('192.168.1.1');
    setCidrPrefix('24');
  };

  const calculate = () => {
    const prefix = safeParseNumber(cidrPrefix, 24);

    const ipParts = ipAddress.split('.').map((p) => parseInt(p, 10));

    if (
      prefix < 0 ||
      prefix > 32 ||
      ipParts.length !== 4 ||
      ipParts.some((p) => isNaN(p) || p < 0 || p > 255)
    ) {
      return { isValid: false, msg: 'Invalid IPv4 address or CIDR prefix (0-32).' };
    }

    // Total IP addresses in subnet = 2 ^ (32 - prefix)
    const totalAddresses = Math.pow(2, 32 - prefix);

    // Usable hosts = totalAddresses - 2 (network & broadcast)
    const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0, totalAddresses - 2);

    // Calculate Subnet Mask
    let maskNumeric = 0;
    for (let i = 0; i < prefix; i++) {
      maskNumeric |= 1 << (31 - i);
    }
    const maskOctets = [
      (maskNumeric >>> 24) & 255,
      (maskNumeric >>> 16) & 255,
      (maskNumeric >>> 8) & 255,
      maskNumeric & 255,
    ];
    const subnetMaskStr = maskOctets.join('.');

    // Network IP
    const ipNumeric =
      ((ipParts[0] << 24) >>> 0) +
      ((ipParts[1] << 16) >>> 0) +
      ((ipParts[2] << 8) >>> 0) +
      (ipParts[3] >>> 0);

    const networkNumeric = (ipNumeric & maskNumeric) >>> 0;
    const networkOctets = [
      (networkNumeric >>> 24) & 255,
      (networkNumeric >>> 16) & 255,
      (networkNumeric >>> 8) & 255,
      networkNumeric & 255,
    ];
    const networkIpStr = networkOctets.join('.');

    // Broadcast IP
    const wildcardNumeric = (~maskNumeric) >>> 0;
    const broadcastNumeric = (networkNumeric | wildcardNumeric) >>> 0;
    const broadcastOctets = [
      (broadcastNumeric >>> 24) & 255,
      (broadcastNumeric >>> 16) & 255,
      (broadcastNumeric >>> 8) & 255,
      broadcastNumeric & 255,
    ];
    const broadcastIpStr = broadcastOctets.join('.');

    return {
      isValid: true,
      msg: '',
      ipAddress,
      prefix,
      totalAddresses,
      usableHosts,
      subnetMaskStr,
      networkIpStr,
      broadcastIpStr,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Subnet ${ipAddress}/${cidrPrefix}: Mask ${res.subnetMaskStr} (${formatNumber(res.usableHosts, 0)} Usable Hosts)`,
        { ipAddress, cidrPrefix },
        { subnetMask: res.subnetMaskStr, usableHosts: res.usableHosts }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          IPv4 Address & CIDR Notation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="ipAddress" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              IPv4 Address
            </label>
            <input
              id="ipAddress"
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <CalcInput id="cidrPrefix" label="CIDR Subnet Prefix" prefix="/" value={cidrPrefix} onChange={setCidrPrefix} min={0} max={32} helperText="Prefix length (0 to 32)" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Subnet Mask"
              value={res.subnetMaskStr}
              subtitle={`Equivalent to /${cidrPrefix}`}
              highlighted={true}
            />
            <CalcResultCard
              title="Usable Host Capacity"
              value={formatNumber(res.usableHosts, 0)}
              subtitle={`Total IPs: ${formatNumber(res.totalAddresses, 0)}`}
              badgeText="IPv4 Capacity"
              badgeType="info"
            />
            <CalcResultCard
              title="Network ID Address"
              value={res.networkIpStr}
              subtitle="Subnet network identifier"
            />
            <CalcResultCard
              title="Broadcast Address"
              value={res.broadcastIpStr}
              subtitle="Subnet broadcast destination"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Usable host addresses equal total IP range minus 2 (network ID address and broadcast address).</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                Save Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
