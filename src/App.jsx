import postcodes from "./utilities/postcodes.json";
import lcs from "./utilities/LEPs-&-CAs(1).json";
import { useState } from "react";
import AuthorityDetails from "./components/AuthorityDetails";

export default function App() {
  const [valid, setValid] = useState({});

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
    const regex = /^[a-z]{1,2}\d{2,3}[a-z]{2}/i; //checks for the format where there is 1 or 2 letters followed by 2 or 3 numbers followed by exactly 2 letters and ignores the case of the letters //* This should match a postcode format
    const userInput = data.postcode
      .replaceAll(/\s*/g, "")
      .match(regex)?.[0]
      .toUpperCase(); //This removes all spaces from the user input checks if it matchs the regex above and then makes the matched group uppercase
    console.log(userInput);
    if (userInput) {
      const lauaFromPostcode = pcdList.find((postcode) => {
        return postcode.pcd.replaceAll(/\s*/g, "") == userInput;
      })?.laua;

      if (lauaFromPostcode === undefined) {
        //doesn't exist
        console.log("doesn't exist", lauaFromPostcode);
        setValid({ lauaFromPostcode });
      } else if (lauaFromPostcode === "") {
        //doesn't have a laua
        console.log("doesn't have a laua", lauaFromPostcode);
        setValid({ lauaFromPostcode });
      } else {
        console.log(lauaFromPostcode);
        const found = lepsCAs.filter((lepCA) => {
          return lauaFromPostcode === lepCA.laua;
        });
        setValid({ found, lauaFromPostcode });
      }
    } else {
      setValid({ passCheck: false });
    }
  }
  return (
    <>
      {valid.passCheck === false && <p>postcodes must be valid</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="postcode">Enter postcode:</label>
        <input id="postcode" name="postcode"></input>
        <button type="submit">Search</button>
      </form>
      {valid.found && valid.found.length >= 1 ? (
        valid.found.map((authority, i) => {
          return <AuthorityDetails authority={authority} key={i} />;
        })
      ) : valid.lauaFromPostcode !== undefined ? (
        valid.found ? (
          <p>This postcode is not funded</p>
        ) : (
          <p>This postcode doesn't have a laua</p>
        )
      ) : (
        valid.length >= 1 && <p>This postcode is not in our data</p>
      )}
    </>
  );
}
