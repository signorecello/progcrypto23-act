import React, { ReactElement, useContext, useState } from 'react';
import NodeComponent from '../components/leaf/leaf';
import { WagmiConfig, createConfig, configureChains, useAccount } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Connect } from '../components/connect';
import { Connected } from '../components/connected';
import BinaryTree from '../components/tree/tree';
import Tree from '../components/tree/tree';
import styled from 'styled-components';
import Leaf, { LeafProps } from '../components/leaf/leaf';
import { NoirContext } from '../components/context';
import { cheats, publicInputsDB } from '../utils/publicInputsToMain';
import { StyledNodeButton } from '../components/leaf/leaf.styles';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  /* Add more styles as needed */
`;

const ModalComponent = ({ onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>{children}</ModalContent>
    </ModalOverlay>
  );
};

// this is a stub, because nargo will only give me final proofs
// later on each sticker has its own modal and returns its own final proof
const stubGenerateMainProof = async (stickerId: number) => {
  const { noirs, backends } = useContext(NoirContext)!;

  const { witness } = await noirs!.main.execute({
    answer: cheats[stickerId],
    answerHash: publicInputsDB[stickerId],
  });

  const proof = await backends!.main.generateIntermediateProof(witness);
  return proof;
};

// gonna remove the on-chain stuff for now
// since on-chain can be broken at the time
export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeLeaf, setActiveLeaf] = useState<LeafProps>({
    level: 0,
    index: 0,
  });

  const setActive = ({ level, index }) => {
    if (level != null && index != null) {
      // Assuming level and index can be 0 which is falsy in JavaScript
      setActiveLeaf({ level, index });
      setModalOpen(true); // Open the modal only if we have valid level and index
    } else {
      setModalOpen(!isModalOpen); // Toggle in other cases
    }
  };

  return (
    <>
      <Tree depth={4} nodeClickListener={setActive} isModalOpen={isModalOpen} />
      {isModalOpen && (
        <ModalComponent onClose={setActive}>
          {console.log(activeLeaf)}
          {/* <StyledNodeButton onClick={() => stubGenerateMainProof()}></StyledNodeButton> */}
          <Leaf stickerId={0} leafProps={activeLeaf} toggleModal={setActive} />
        </ModalComponent>
      )}
    </>
  );
}
