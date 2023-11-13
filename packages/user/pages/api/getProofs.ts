import clientPromise from '../../utils/db/mongo';

export default async function handler(req, res) {
  try {
    // console.log(username, stickerId, proof, publicInputs);

    const dbClient = await clientPromise;
    const proofDB = dbClient.db('proofs');

    const proofs = await proofDB
      .collection('proofs')
      // @ts-ignore
      .find({})
      .project({ level: true, index: true })
      .toArray();

    console.log(proofs);
    res.status(200).send({ proofs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
