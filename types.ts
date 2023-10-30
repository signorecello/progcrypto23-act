
import { Noir, abi } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { CompiledCircuit, ProofData } from "@noir-lang/types"


export type Circuits = {
  main: CompiledCircuit,
  [key: string]: CompiledCircuit
}

export type BackendInstances = {
  mains: {
    alice: BarretenbergBackend
    bob: BarretenbergBackend
  },
  aggregators: {
    alice: BarretenbergBackend
    bob: BarretenbergBackend
  },
}

export type Noirs = {
  main: Noir,
  [key: string]: Noir
}

export interface ProofArtifacts extends ProofData {
  returnValue: Uint8Array,
  proofAsFields: string[],
  vkAsFields: string[],
  vkHash: string
}

