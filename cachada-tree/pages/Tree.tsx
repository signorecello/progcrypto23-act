import React, { ReactNode } from 'react';
import styles from '../styles/Tree.module.css';

interface SmallProps {
  children?: ReactNode;
  depth: number;
}

const Small: React.FC<SmallProps> = ({ depth }) => {
  const generateProjectTree = (currentDepth: number): ReactNode => {
    if (currentDepth <= 0) {
      return null;
    }

    return (
      <ul>
        <li>
          <label>#-#</label>
          {generateProjectTree(currentDepth - 1)}
        </li>
        <li>
          <label>#-#</label>
          {generateProjectTree(currentDepth - 1)}
        </li>
      </ul>
    );
  };

  return generateProjectTree(depth);
};

const ProjectTree = () => {
  const treeDepth = 5;
  return (
    <>
      <main className={styles.main}>
        <div className={styles.background}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={1464}
            height={1080}
            viewBox="0 0 1464 1080"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1464 367.323V0H984.274L49.8672 934.407C30.7871 953.487 14.1647 974.103 4.77739e-08 995.86L0 1080H348.655L1197.86 230.8L1200.5 228.156V228.14C1237.53 196.4 1295.72 196.4 1330.1 233.428L1464 367.323ZM793.052 1080H1464V811.72L1279.86 627.578C1269.28 617.003 1256.05 617.003 1245.47 627.578L793.052 1080Z"
              fill="url(#paint0_linear_1_54430)"
              fillOpacity="0.2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_54430"
                x1={865}
                y1={-567}
                x2="870.5"
                y2={1080}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EFD6F9" />
                <stop offset={1} stopColor="#EFD6F9" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          {' '}
          <h1 className={styles.title}>Project Leaderboard</h1>
        </div>
        <div className={styles.container}>
          <ul>
            <li>
              <label>#-#</label>
              <Small depth={treeDepth - 1} />
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default ProjectTree;
