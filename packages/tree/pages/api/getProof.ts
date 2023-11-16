import clientPromise from '../../utils/db/mongo';

export default async function handler(req : any, res : any) {
  try {
    const { level, index } = JSON.parse(req.body);

    const dbClient = await clientPromise;
    const db = dbClient.db('proofs');
    const proof = await db.collection('proofs').findOne({ level, index });

    res.status(200).send({ proof });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
