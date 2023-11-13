import clientPromise from '../../utils/db/mongo';

export default async function handler(req, res) {
  try {
    const { stickerId } = req.query;
    console.log(stickerId);

    const dbClient = await clientPromise;
    const db = dbClient.db('answers');
    const document = await db.collection('answers').findOne({ stickerId: parseInt(stickerId) });

    console.log(document);
    res.status(200).send(document);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
