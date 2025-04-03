import postcodes from "./utilities/postcodes.json";
import lcs from "./utilities/LEPs-&-CAs.json";
import { useState } from "react";
import AuthorityDetails from "./components/AuthorityDetails";

export default function App() {
  const [valid, setValid] = useState({ visible: false });
  console.log(valid);
  const pcdList = postcodes;
  const lepsCAs = lcs;
  // console.log(pcdList[0].pcd);
  // console.log(lepsCAs[0]);
  //listen to postcode input if it is valid length search the json for the postcode
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    const found = lepsCAs.filter((lepCA) => {
      const lauaFromPostcode = pcdList.find((postcode) => {
        if (postcode.pcd == data.postcode) {
          //console.log(postcode.pcd == data.postcode);
        }

        return postcode.pcd == data.postcode;
      }).laua;
      //console.log(lauaFromPostcode);
      return lauaFromPostcode === lepCA.laua;
    });
    setValid((curr) => {
      return { ...curr, found };
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postcode">Enter postcode:</label>
        <input id="postcode" name="postcode"></input>
        <button type="submit">Search</button>
      </form>
      {valid.found ? (
        valid.found.length >= 1 &&
        valid.found.map((authority, i) => (
          <AuthorityDetails authority={authority} key={i} />
        ))
      ) : (
        <p>This postcode is not funded</p>
      )}
    </>
  );
}
