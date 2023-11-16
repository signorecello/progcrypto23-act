import { noir } from '../../utils/noirServerSide';
import { DBPutBody } from '../../types';
import clientPromise from '../../utils/db/mongo';
import { fromHex } from 'viem';

export default async function handler(req, res) {
  try {
    const { username, stickerId, proof, publicInputs }: DBPutBody = JSON.parse(req.body);
    console.log(username, stickerId, proof, publicInputs);

    const dbClient = await clientPromise;
    const proofDB = dbClient.db('proofs');

    await noir.init();
    const { proofAsFields, vkAsFields, vkHash } = await noir
      .getBackend()
      .generateIntermediateProofArtifacts(
        {
          proof: fromHex(proof as `0x${string}`, 'bytes'),
          publicInputs: [fromHex(publicInputs as `0x${string}`, 'bytes')],
        },
        1,
      );
      

    const nextIndex = await proofDB.collection('proofs').countDocuments({ level: 0 });

    await proofDB.collection('proofs').insertOne({
      username,
      proof: proofAsFields,
      answerHash: publicInputs,
      vk: vkAsFields,
      vkHash,
      level: 0,
      index: nextIndex,
    });
    res.status(200).send({ message: 'Success' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
