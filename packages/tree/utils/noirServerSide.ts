import { BarretenbergBackend } from '@signorecello/backend_barretenberg';
import { CompiledCircuit, Noir } from '@signorecello/noir_js';
import main from '../../noir/main/target/main.json';
import { fromHex } from 'viem';
import { Fr } from '@signorecello/bb.js';
import { cpus } from "os";
class ServerNoir {
  backend;
  noir;

  constructor() {
    this.backend = new BarretenbergBackend(main as unknown as CompiledCircuit, {
      threads: cpus.length,
      memory: {
        initial: 25,
        maximum: 2 ** 14,
      },
    });

    this.noir = new Noir(main as unknown as CompiledCircuit, this.backend);
  }

  async init() {
    await this.noir.init();
  }

  getBackend() {
    return this.backend;
  }

  getNoir() {
    return this.noir;
  }
}

export const noir = new ServerNoir();
