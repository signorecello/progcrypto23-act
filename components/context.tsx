import { createContext, useEffect, useState } from 'react';
import { BackendInstances, Noirs } from '../types';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit } from '@noir-lang/types';

import main from '../circuits/main/target/main.json';
import aggregator from '../circuits/aggregator/target/aggregator.json';
import React from 'react';

export const NoirContext = createContext<{ noirs: Noirs; backends: BackendInstances } | null>(null);

export function NoirProvider({ children }) {
  const [noirs, setNoirs] = useState<{ noirs: Noirs; backends: BackendInstances } | null>(null);

  useEffect(() => {
    if (main && aggregator) {
      const initializeNoir = async () => {
        const backends = {
          main: new BarretenbergBackend(main as unknown as CompiledCircuit, { threads: 8 }),
          aggregator: new BarretenbergBackend(aggregator as unknown as CompiledCircuit, {
            threads: 8,
          }),
        };

        const noirs = {
          main: new Noir(main as unknown as CompiledCircuit, backends.main),
          aggregator: new Noir(aggregator as unknown as CompiledCircuit, backends.aggregator),
        };
        await noirs.main.init();
        await noirs.aggregator.init();

        setNoirs({ noirs, backends });
      };
      initializeNoir();
    }
  }, [main, aggregator]);

  if (!noirs) return <></>;

  return <NoirContext.Provider value={noirs}>{children}</NoirContext.Provider>;
}
