import { useState, useEffect } from 'react';
import { nextKickoff, formatCountdown } from '../lib/kickoff';

export default function CountdownClock() {
  const [display, setDisplay] = useState('--:--:--');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const target = nextKickoff(now);
      const diffSec = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
      setDisplay(formatCountdown(diffSec));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono tabular-nums">{display}</span>;
}
