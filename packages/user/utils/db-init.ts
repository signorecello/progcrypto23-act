import { cpus } from 'os';
import quiz from './answers.json';
import dotenv from 'dotenv';
import { CompiledCircuit, Noir } from '@signorecello/noir_js';
import pedersen from '../../noir/pedersen/target/pedersen.json';
// import { Barretenberg, Fr } from '@signorecello/bb.js';

dotenv.config();

const addAnswerHashes = async () => {
  // const bb = await Barretenberg.new({ threads: cpus().length });
  const clientPromise = await import('./db/mongo');
  const dbClient = await clientPromise.default;

  dbClient.db('answers').dropCollection('answers');
  for await (let [index, entry] of quiz.entries()) {
    const db = dbClient.db('answers');
    const { returnValue } = await new Noir(pedersen as unknown as CompiledCircuit).execute({
      input: entry.answer,
    });

    await db.collection('answers').insertOne({
      stickerId: index,
      question: entry.question,
      answer: entry.answer,
      answerHash: returnValue.toString(),
    });
  }

  dbClient.close();

  // bb.destroy();
};

addAnswerHashes();
