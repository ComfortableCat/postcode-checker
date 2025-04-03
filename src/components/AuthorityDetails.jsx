export default function AuthorityDetails({ authority }) {
  return (
    <>
      <div>
        <p>{authority.LEPCA}</p>
        <p>{authority.DistrictUnitary}</p>
        <p>{authority.laua}</p>
      </div>
    </>
  );
}
