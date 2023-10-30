// @ts-ignore
import { expect } from 'chai';
import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { BackendInstances, Circuits, Noirs } from '../types';
import { ethers } from 'hardhat';
import type * as ethersType from "ethers";
import { compile } from '@noir-lang/noir_wasm';
import path from 'path';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import main from "../circuits/main/target/main.json"
import aggregator from "../circuits/aggregator/target/aggregator.json"

import pedersen from "../circuits/utils/pedersen/target/pedersen.json";

// const getCircuit = async (name: string) => {
//   const compiled = await compile(path.resolve("circuits", name, "src", `${name}.nr`));
//   return compiled
// }

const getArtifactsPath = (name: string) => {
  return path.join("circuits", name, "contract", name, "plonk_vk.sol:UltraVerifier")
}

  
// describe.skip("Normal flow", async() => {
//   let mainProof : ProofData;

//   let circuits : Circuits;
//   let backends : BackendInstances;
//   let noirs : Noirs;
  
//   const mainInput = { x : 1, y : 2 };

//   before(async () => {
//     circuits = {
//       main: main as unknown as CompiledCircuit,
//       recursive: recursive as unknown as CompiledCircuit
//     }
//     backends = {
//       main: new BarretenbergBackend(circuits.main, {threads: 8}),
//       recursive: new BarretenbergBackend(circuits.recursive, {threads: 8})
//     }
//     noirs = {
//       main: new Noir(circuits.main, backends.main),
//       recursive: new Noir(circuits.recursive, backends.recursive)
//     }
//   })


//   after(async () => {
//     await backends.main.destroy();
//     await backends.recursive.destroy();
//   })

//   describe("Proof generation", async () => {
//     it('Should generate a final proof', async () => {
//       mainProof = await noirs.main.generateFinalProof(mainInput)
//       expect(mainProof.proof instanceof Uint8Array).to.be.true;
//     });
//   })

//   describe("Proof verification", async() => {
//     let verifierContract : ethersType.Contract;

//     before(async () => {
//       const verifierContractFactory = await ethers.getContractFactory(getArtifactsPath("main"));
//       verifierContract = await verifierContractFactory.deploy();
//     });
    
//     it('Should verify off-chain', async () => {
//       const verified = await noirs.main.verifyFinalProof(mainProof);
//       expect(verified).to.be.true;
//     });

//     it("Should verify on-chain", async () => {
//       const { proof, publicInputs } = mainProof;
//       const verified = await verifierContract.verify(proof, publicInputs);
//       expect(verified).to.be.true;
//     })
//   })
// })

// describe.skip("Recursive flow", async() => {
//   let circuits : Circuits;
//   let backends : BackendInstances;
//   let noirs : Noirs;
  
//   const mainInput = { x : 1, y : 2 };

//   let inputsToRecursive : any;
//   let recursiveProof : ProofData;

//   before(async () => {
//     circuits = {
//       main: main as unknown as CompiledCircuit,
//       recursive: recursive as unknown as CompiledCircuit
//     }
//     backends = {
//       main: new BarretenbergBackend(circuits.main, {threads: 8}),
//       recursive: new BarretenbergBackend(circuits.recursive, {threads: 8})
//     }
//     noirs = {
//       main: new Noir(circuits.main, backends.main),
//       recursive: new Noir(circuits.recursive, backends.recursive)
//     }
//   })

//   after(async () => {
//     await backends.main.destroy();
//     await backends.recursive.destroy();
//   })

//   describe("Proof generation", async() => {
//     it('Should generate an intermediate proof', async () => {

//       const { witness, returnValue } = await noirs.main.execute(mainInput);
//       const {proof, publicInputs} = await backends.main.generateIntermediateProof(witness);

//       expect(proof instanceof Uint8Array).to.be.true;

//       const verified = await backends.main.verifyIntermediateProof({ proof, publicInputs});
//       expect(verified).to.be.true;

//       const numPublicInputs = 1;
//       const { proofAsFields, vkAsFields, vkHash } = await backends.main.generateIntermediateProofArtifacts(
//         {publicInputs, proof},
//         numPublicInputs,
//       );
//       expect(vkAsFields).to.be.of.length(114);
//       expect(vkHash).to.be.a('string');

//       const aggregationObject = Array(16).fill(
//         '0x0000000000000000000000000000000000000000000000000000000000000000',
//       );
//       inputsToRecursive = {
//         verification_key: vkAsFields,
//         proof: proofAsFields,
//         public_inputs: [mainInput.y],
//         key_hash: vkHash,
//         input_aggregation_object: aggregationObject,
//       }

//     });

//     it("Should generate a final proof with the output of the main circuit", async () => {
//       recursiveProof = await noirs.recursive.generateFinalProof(inputsToRecursive)
//       expect(recursiveProof.proof instanceof Uint8Array).to.be.true;
//     })
//   });

//   describe("Proof verification", async() => {
//     let verifierContract : ethersType.Contract;

//     before(async () => {
//       const verifierContractFactory = await ethers.getContractFactory(getArtifactsPath("recursion"));
//       verifierContract = await verifierContractFactory.deploy();

//       const verifierAddr = await verifierContract.deployed();
//     });
    
//     it('Should verify off-chain', async () => {
//       const verified = await noirs.recursive.verifyFinalProof(recursiveProof);
//       expect(verified).to.be.true;
//     });

//     it("Should verify on-chain", async () => {
//       const verified = await verifierContract.verify(recursiveProof.proof, recursiveProof.publicInputs);
//       expect(verified).to.be.true;
//     })
//   })
// })

describe("Two provers", async() => {
  let circuits : Circuits;
  let backends : BackendInstances;
  let mainNoir : Noir;
  let aggregatorNoir : Noir;
  

  let inputsToRecursive : any;
  let recursiveProofs : ProofData[] = [];

  before(async () => {
    circuits = {
      main: main as unknown as CompiledCircuit,
      aggregator: aggregator as unknown as CompiledCircuit
    }
    backends = {
      mains: {
        alice: new BarretenbergBackend(circuits.main, {threads: 8}),
        bob: new BarretenbergBackend(circuits.main, {threads: 8})
      },
      aggregators: {
        alice: new BarretenbergBackend(circuits.aggregator, {threads: 8}),
        bob: new BarretenbergBackend(circuits.aggregator, {threads: 8})
      }
    },
    mainNoir = new Noir(circuits.main)
    aggregatorNoir = new Noir(circuits.aggregator)
  })

  after(async () => {
    await backends.mains.alice.destroy();
    await backends.mains.bob.destroy();
    await backends.aggregators.alice.destroy();
    await backends.aggregators.bob.destroy();
  })

  describe("E2E Game!", async() => {
    let alices_secret_number : number = 1;
    let bobs_secret_number : number = 2;
    let alices_hashed_number : string;
    let bobs_hashed_number : string;

    let random_number_for_alices_play : number;
    let random_number_for_bobs_play : number;

    before("Alice and Bob agree on a random number for their opponent", async () => {
      random_number_for_alices_play = 10;
      random_number_for_bobs_play = 42;

      const pedersenNoir = new Noir(pedersen as unknown as CompiledCircuit)

      const { returnValue: aliceReturnValue } = await pedersenNoir.execute(
        {input : [alices_secret_number, random_number_for_alices_play]
      })
      const { returnValue: bobReturnValue } = await pedersenNoir.execute(
        {input : [bobs_secret_number, random_number_for_bobs_play]
      })
      alices_hashed_number = aliceReturnValue as string;
      bobs_hashed_number = bobReturnValue as string;
    });

    it('Alice should generate a proof of her play', async () => {
      // OFF-CHAIN
      // Bob tries to guess and... HE GUESSES WRONG!

      // Alice is proving he guessed right, so she can try herself
      const mainInput = { 
        my_number : alices_secret_number, 
        random_number : random_number_for_alices_play,
        their_guess_pub : 27, // we know he gets it wrong
        my_hashed_number : alices_hashed_number
      };

      const { witness } = await mainNoir.execute(mainInput);
      
      // it will be verified in another proof!
      const {proof, publicInputs} = await backends.mains.alice.generateIntermediateProof(witness);
      

      // now for the WRAPPER!

      // there are 3 public inputs
      // and Alice is doing this because this is Alice's proof (that will go into her own aggregator)
      const { proofAsFields: alices_main_proof, vkAsFields: alices_main_vk, vkHash: alices_main_vk_hash } = await backends.mains.alice.generateIntermediateProofArtifacts(
        {publicInputs, proof},
        3,
      );

      // it's the first turn, so Alice just verifies her own proof twice
      const bunchOfZeros = ethers.utils.hexZeroPad("0x0", 32)
      const uselessStuff = {
        their_vk : alices_main_vk,
        their_proof : alices_main_proof,
        their_key_hash : alices_main_vk_hash,
        their_input_aggregation : Array(16).fill(bunchOfZeros),

        their_random_number: mainInput.random_number,
        my_previous_guess: mainInput.their_guess_pub,
        their_hashed_number: mainInput.my_hashed_number
      }
      
      const inputsToAlicesAggregator = {
        ...uselessStuff,

        my_vk: alices_main_vk,
        my_proof: alices_main_proof,
        my_key_hash: alices_main_vk_hash,
        my_random_number: mainInput.random_number,
        their_guess: mainInput.their_guess_pub,
        my_hashed_number: mainInput.my_hashed_number,
      }


      const { witness: alicesAggregatorWitness, returnValue: alicesAggregatorReturnWitness } = await aggregatorNoir.execute(inputsToAlicesAggregator);

      const { proof: alicesAggregatedProof, publicInputs: alicesPublicInputsToAggregatedProof } = await backends.aggregators.alice.generateIntermediateProof(alicesAggregatorWitness);

      const verification = await backends.aggregators.alice.verifyIntermediateProof({ proof: alicesAggregatedProof, publicInputs: alicesPublicInputsToAggregatedProof });
      expect(verification).to.be.true;
    });


    // it("Alice should generate an intermediate proof with the output of the main circuit", async () => {
    //   const { witness, returnValue } = await noirs.alice.execute(inputsToRecursive);
    //   console.log("witness", witness)

    //   const intermediateProof = await backends.alice.generateIntermediateProof(witness)
    //   expect(intermediateProof.proof instanceof Uint8Array).to.be.true;
    //   console.log("Alice's intermediate proof: ", intermediateProof.proof)

    //   const verified = await backends.alice.verifyIntermediateProof(intermediateProof);
    //   expect(verified).to.be.true;
    //   console.log("Alice's intermediate proof verified by Alice: ", verified)

    //   recursiveProofs.push(intermediateProof)
    // })

    // it('Bob should verify the intermediate proof', async () => {
    //   const lastProof = recursiveProofs[recursiveProofs.length - 1];
    //   const verified = await backends.bob.verifyIntermediateProof(lastProof);
    //   console.log("Alice's intermediate proof verified by Bob: ", verified)
    //   expect(verified).to.be.true;
    // })

    
    
  });

})
