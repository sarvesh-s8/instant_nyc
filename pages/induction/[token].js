import { useRouter } from "next/router";
const Induction = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <div>
      <div></div>
    </div>
  );
};
export default Induction;
