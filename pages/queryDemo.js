import { useRouter } from "next/router";

const QueryDemo = () => {
  const router = useRouter();
  const { query } = router;

  console.log("query: ", query);

  return (
    <>
      <h1>QueryDemo Page</h1>
    </>
  );
};

export default QueryDemo;
