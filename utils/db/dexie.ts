import Dexie, { Table } from 'dexie';
import { DBProof } from '../../types';

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  proofs!: Table<DBProof>;

  constructor() {
    super('ProofsIndexedDB');
    this.version(1).stores({
      proofs: '++id, &[level+index], username, answerHash, proof, _id',
    });
  }
}

async function getLastAvailableIndex() {
  try {
    const lastEntry = await db.proofs.where('level').equals(0).reverse().sortBy('index');

    // Return the last index if found, or -1 if no entries exist
    return lastEntry.length > 0 ? lastEntry[0].index : -1;
  } catch (error) {
    console.error('Error retrieving the last index:', error);
    return -1;
  }
}

export async function addLeaf(data) {
  data.level = 0;
  console.log(data);

  try {
    const lastIndex = await getLastAvailableIndex();
    const nextIndex = lastIndex! + 1;

    // Set the next index on the data object
    data.index = nextIndex;

    // Add the new entry to the database
    await db.proofs.add(data);
    console.log(`Entry added successfully at index ${nextIndex}!`);
  } catch (error) {
    // Handle the error appropriately
    console.error('Error adding entry:', error);
  }
}

export const db = new MySubClassedDexie();
