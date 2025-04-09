export default function AuthorityDetails({ valid }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-start">
        Results for{" "}
        {`${valid.userInput.slice(0, -3)} ${valid.userInput.slice(-3)}`}
      </p>
      <div>
        {valid.found.map((authority, i) => {
          return (
            <div key={i} className="flex flex-col justify-center text-center">
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
    </div>
  );
}
