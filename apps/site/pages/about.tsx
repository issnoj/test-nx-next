import { GetStaticProps } from 'next';
import './about.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export function About({ name }: AboutProps) {
  return (
    <div>
      <h1>Welcome, {name}!!</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'issnoj',
    },
  };
};

export default About;
