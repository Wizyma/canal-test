import { useRouter } from 'next/router';

const Show = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Show: {pid}</p>;
};

export default Show;
