'use client';

import { Noir, abi } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { CompiledCircuit, ProofData } from '@noir-lang/types';

export interface ProofArtifacts {
  vkAsFields: string[];
  proofAsFields: string[];
  publicInputs: string[];
  vkHash: string;
  aggregation: string[];
}

export type BackendInstances = {
  main: BarretenbergBackend;
  aggregator: BarretenbergBackend;
};

export type Noirs = {
  main: Noir;
  aggregator: Noir;
};

export interface DBProof {
  username: string;
  answerHash: string;
  proof: string;

  _id?: string;
  level?: number;
  index?: number;
}

export type DBPutBody = {
  username: string;
  proof: string;
  stickerId: string;
};
