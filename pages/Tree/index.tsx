import React, { ReactElement, useContext, useState } from 'react';
import Tree from '../../components/tree/tree';
import Leaf, { LeafProps } from '../../components/addProof/addProof';
import { NoirAggregatorProvider } from '../../components/noirContext/aggregator';
import { cheats, publicInputsDB } from '../../utils/publicInputsToMain';
import { StyledHeader } from '../../styles/Typography';
import { ModalComponent } from '../../components/modal';

import { db } from '../../utils/db/dexie';

// gonna remove the on-chain stuff for now
// since on-chain can be broken at the time
export default function Page() {
  return (
    <NoirAggregatorProvider>
      <StyledHeader>Leaderboard</StyledHeader>
      <Tree depth={4} />
    </NoirAggregatorProvider>
  );
}
