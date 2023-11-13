import { BarretenbergBackend } from '@signorecello/backend_barretenberg';
import { CompiledCircuit, Noir } from '@signorecello/noir_js';
import main from '../../noir/main/target/main.json';
import { fromHex } from 'viem';
import { Fr } from '@signorecello/bb.js';

class ServerNoir {
  backend;
  noir;

  constructor() {
    console.log('ServerNoir constructor');
    this.backend = new BarretenbergBackend(main as unknown as CompiledCircuit, {
      threads: 8
    });

    console.log("0")
    this.noir = new Noir(main as unknown as CompiledCircuit, this.backend);
    console.log("1")
  }

  async init() {
    console.log("2")

    await this.noir.init();
    console.log("3")

  }

  getBackend() {
    return this.backend;
  }

  getNoir() {
    return this.noir;
  }
}

export const noir = new ServerNoir();
