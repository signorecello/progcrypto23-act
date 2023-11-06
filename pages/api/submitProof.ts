import { DBProof, DBPutBody } from '../../types';
import clientPromise from '../../utils/db/mongo';
import { publicInputsDB } from '../../utils/publicInputsToMain';

export default async function handler(req, res) {
  try {
    const { username, proof, stickerId }: DBPutBody = JSON.parse(req.body);
    console.log(username, proof);

    const dbClient = await clientPromise;
    const db = dbClient.db('proofs');

    await db.collection('proofs').insertOne({
      username,
      proof,
      answerHash: publicInputsDB[stickerId],
    });

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
