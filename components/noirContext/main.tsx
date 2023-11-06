import { createContext, useEffect, useState } from 'react';
import { BackendInstances, Noirs } from '../../types';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit } from '@noir-lang/types';

import main from '../../circuits/main/target/main.json';
import aggregator from '../../circuits/aggregator/target/aggregator.json';
import React from 'react';

export const NoirMainContext = createContext<{ noir: Noir; backend: BarretenbergBackend } | null>(
  null,
);

export function NoirMainProvider({ children }) {
  const [noir, setNoir] = useState<{ noir: Noir; backend: BarretenbergBackend } | null>(null);

  useEffect(() => {
    if (main && aggregator) {
      const initializeNoir = async () => {
        const backend = new BarretenbergBackend(main as unknown as CompiledCircuit, {
          threads: window.navigator.hardwareConcurrency,
        });

        const noir = new Noir(main as unknown as CompiledCircuit, backend);
        await noir.init();

        setNoir({ noir, backend });
      };
      initializeNoir();
    }
  }, [main, aggregator]);

  if (!noir) return <></>;

  return <NoirMainContext.Provider value={noir}>{children}</NoirMainContext.Provider>;
}
