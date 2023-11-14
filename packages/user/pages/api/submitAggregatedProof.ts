import { DBAggrPutBody } from '../../types';
import clientPromise from '../../utils/db/mongo';
import { fromHex } from 'viem';
import { noir } from '../../utils/noirServerSide';

export default async function handler(req, res) {
  try {
    const { level, index, proof, publicInputs }: DBAggrPutBody = JSON.parse(req.body);
    console.log({ level, index, proof, publicInputs });

    const dbClient = await clientPromise;
    const proofDB = dbClient.db('proofs');

    await noir.init();
    console.log("after init")
    const backend = await noir.getBackend()
    console.log("after getBackend")
    const { proofAsFields, vkAsFields, vkHash } = backend
      .generateIntermediateProofArtifacts(
        {
          proof: fromHex(proof as `0x${string}`, 'bytes'),
          publicInputs: [fromHex(publicInputs as `0x${string}`, 'bytes')],
        },
        1,
      );

    await proofDB.collection('proofs').insertOne({
      username: `${level}-${index}`,
      proof: proofAsFields,
      answerHash: publicInputs,
      vk: vkAsFields,
      vkHash,
      level,
      index,
    });

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error' });
  }
}
