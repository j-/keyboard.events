import { useEffect, useMemo, useState } from "react";

export enum OS {
  /** MacOS */
  MAC = 'mac',
  /** iOS */
  IOS = 'ios',
  /** Windows */
  WIN = 'win',
  /** Android */
  AND = 'and',
  /** Linux */
  LIN = 'lin',
  /** Other */
  OTH = 'oth',
}

const macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

// See https://stackoverflow.com/a/38241481
export const getOS = (platform = window.navigator.platform, userAgent = window.navigator.userAgent): OS => {
	if (macosPlatforms.includes(platform)) {
		return OS.MAC;
	} else if (iosPlatforms.includes(platform)) {
		return OS.IOS;
	} else if (windowsPlatforms.includes(platform)) {
		return OS.WIN;
	} else if (/Android/.test(userAgent)) {
		return OS.AND;
	} else if (/Linux/.test(platform)) {
		return OS.LIN;
	} else {
    return OS.OTH;
  }
};

const usePlatform = () => {
  const [platform, setPlatform] = useState(() => window.navigator.platform);
  useEffect(() => setPlatform(window.navigator.platform));
  return platform;
};

const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState(() => window.navigator.userAgent);
  useEffect(() => setUserAgent(window.navigator.userAgent));
  return userAgent;
};

export const useOS = () => {
  const platform = usePlatform();
  const userAgent = useUserAgent();
  const os = useMemo(() => getOS(platform, userAgent), [platform, userAgent]);
  return os;
};
