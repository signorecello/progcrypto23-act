'use client';

import { createContext, useEffect, useState } from 'react';
import { BackendInstances, Noirs } from '../../types';
import { BarretenbergBackend } from '@signorecello/backend_barretenberg';
import { Noir } from '@signorecello/noir_js';
import { CompiledCircuit } from '@noir-lang/types';

import aggregator from '../../../noir/aggregator/target/aggregator.json';
import React from 'react';

export const NoirAggregatorContext = createContext<{
  noir: Noir;
  backend: BarretenbergBackend;
} | null>(null);

export function NoirAggregatorProvider({ children }) {
  const [noir, setNoir] = useState<{ noir: Noir; backend: BarretenbergBackend } | null>(null);

  useEffect(() => {
    if (aggregator) {
      const initializeNoir = async () => {
        const backend = new BarretenbergBackend(aggregator as unknown as CompiledCircuit, {
          threads: 8,
        });

        const noir = new Noir(aggregator as unknown as CompiledCircuit, backend);
        await noir.init();

        setNoir({ noir, backend });
      };
      initializeNoir();
    }
  }, [aggregator]);

  if (!noir) return <></>;

  return <NoirAggregatorContext.Provider value={noir}>{children}</NoirAggregatorContext.Provider>;
}
