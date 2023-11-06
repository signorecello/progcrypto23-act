import clientPromise from '../../utils/db/mongo';

export default async function handler(req, res) {
  try {
    const { username } = req.query;

    console.log(username);
    const dbClient = await clientPromise;
    const db = dbClient.db('proofs');
    const proof = await db.collection('proofs').findOne({ username });

    console.log(proof);
    res.status(200).send(proof);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
