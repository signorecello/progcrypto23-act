import { BarretenbergBackend } from '@signorecello/backend_barretenberg';
import { DBProof, DBPutBody } from '../../types';
import clientPromise from '../../utils/db/mongo';
import { CompiledCircuit, Noir } from '@signorecello/noir_js';
import main from '../../circuits/main/target/main.json';
import { fromHex } from 'viem';
import { Fr } from '@signorecello/bb.js';
import { noir } from '../../utils/noirServerSide';

export default async function handler(req, res) {
  try {
    const { level } = req.query;
    console.log(level);
    // console.log(username, stickerId, proof, publicInputs);

    const dbClient = await clientPromise;
    const proofDB = dbClient.db('proofs');

    const proofs = await proofDB
      .collection('proofs')
      // @ts-ignore
      .find({ level: parseInt(level) })
      .project({ level: true, index: true })
      .toArray();

    console.log(proofs);
    res.status(200).send({ proofs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
