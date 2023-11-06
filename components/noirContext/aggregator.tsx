'use client';

import { createContext, useEffect, useState } from 'react';
import { BackendInstances, Noirs } from '../../types';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { CompiledCircuit } from '@noir-lang/types';

import main from '../../circuits/main/target/main.json';
import aggregator from '../../circuits/aggregator/target/aggregator.json';
import React from 'react';

export const NoirAggregatorContext = createContext<{
  noir: Noir;
  backend: BarretenbergBackend;
} | null>(null);

export function NoirAggregatorProvider({ children }) {
  const [noir, setNoir] = useState<{ noir: Noir; backend: BarretenbergBackend } | null>(null);

  useEffect(() => {
    if (main && aggregator) {
      const initializeNoir = async () => {
        const backend = new BarretenbergBackend(aggregator as unknown as CompiledCircuit, {
          threads: 8,
        });

        const noir = new Noir(main as unknown as CompiledCircuit, backend);
        await noir.init();

        setNoir({ noir, backend });
      };
      initializeNoir();
    }
  }, [main, aggregator]);

  if (!noir) return <></>;

  return <NoirAggregatorContext.Provider value={noir}>{children}</NoirAggregatorContext.Provider>;
}
