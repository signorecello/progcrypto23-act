import { createContext, useEffect, useState } from 'react';
import { BackendInstances, Noirs } from '../../types';
import { BarretenbergBackend } from '@signorecello/backend_barretenberg';
import { Noir } from '@signorecello/noir_js';
import { CompiledCircuit } from '@noir-lang/types';

import main from '../../circuits/main/target/main.json';
import React from 'react';

export const NoirMainContext = createContext<{ noir: Noir; backend: BarretenbergBackend } | null>(
  null,
);

export function NoirMainProvider({ children }) {
  const [noir, setNoir] = useState<{ noir: Noir; backend: BarretenbergBackend } | null>(null);

  useEffect(() => {
    if (main) {
      const initializeNoir = async () => {
        const backend = new BarretenbergBackend(main as unknown as CompiledCircuit, {
          threads: window.navigator.hardwareConcurrency,
          memory: {
            maximum: 2 ** 14,
          },
        });

        const noir = new Noir(main as unknown as CompiledCircuit, backend);
        await noir.init();

        setNoir({ noir, backend });
      };
      initializeNoir();
    }
  }, [main]);

  if (!noir) return <></>;

  return <NoirMainContext.Provider value={noir}>{children}</NoirMainContext.Provider>;
}
