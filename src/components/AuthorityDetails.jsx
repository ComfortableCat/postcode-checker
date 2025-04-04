export default function AuthorityDetails({ valid }) {
  return (
    <>
      <p className="text-start">Results for {valid.userInput}</p>
      <div>
        {valid.found.map((authority, i) => {
          return (
            <div key={i}>
              <p>
                The {authority.LEPCA.match(/[A-Z]{2,3}$/)} is{" "}
                {authority.LEPCA.replace(/[A-Z]{2,3}$/, "")}
              </p>
              <p>The District/Unitary is {authority.DistrictUnitary}</p>
              <p>The laua is {authority.laua}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
