import { cpus } from 'os';
import answers from './answers.json';
import dotenv from 'dotenv';
import { CompiledCircuit, Noir } from '@signorecello/noir_js';
import pedersen from '../../noir/pedersen/target/pedersen.json';
// import { Barretenberg, Fr } from '@signorecello/bb.js';

dotenv.config();

const addAnswerHashes = async () => {
  // const bb = await Barretenberg.new({ threads: cpus().length });
  const clientPromise = await import('./db/mongo');
  const dbClient = await clientPromise.default;

  for await (let [index, answer] of answers.entries()) {
    const db = dbClient.db('answers');
    const { returnValue } = await new Noir(pedersen as unknown as CompiledCircuit).execute({
      input: answer,
    });

    // let returnValue = await bb.pedersenHashWithHashIndex([Fr.fromString(answer)], 0);

    await db.collection('answers').insertOne({
      stickerId: index,
      answer: answer,
      answerHash: returnValue.toString(),
    });
  }

  // bb.destroy();
};

addAnswerHashes();
