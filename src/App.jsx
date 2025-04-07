// import postcodes from "./utilities/postcodes.json";
import "./style.css";
import postcodes1 from "./utilities/postcodes1.json";
import postcodes2 from "./utilities/postcodes2.json";
import lcs from "./utilities/LEPs-&-CAs(1).json";
import { useState } from "react";
import AuthorityDetails from "./components/AuthorityDetails";
import Info from "./components/Info";

export default function App() {
  const [valid, setValid] = useState({});

  console.log(valid);

  const lepsCAs = lcs;
  // console.log(pcdList[0].pcd);
  // console.log(lepsCAs[0]);
  //listen to postcode input if it is valid length search the json for the postcode
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    const regex = /^[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9]|[A-HJKPSTUW])?)|[0-9][A-HJKPSTUW])[0-9][ABD-HJLNP-UW-Z]{2}$/;
    
    const userInput = data.postcode
      .replaceAll(/\s*/g, "")
      .toUpperCase() //This removes all spaces from the user input checks if it matchs the regex above and then makes the matched group uppercase
      .match(regex)?.[0];
    console.log(userInput);
    if (userInput) {
      let lauaFromPostcode;
      if (userInput.localeCompare("LS") === -1) {
        lauaFromPostcode = postcodes1.find((postcode) => {
          return postcode.pcd.replaceAll(/\s*/g, "") == userInput;
        })?.laua;
      } else {
        lauaFromPostcode = postcodes2.find((postcode) => {
          return postcode.pcd.replaceAll(/\s*/g, "") == userInput;
        })?.laua;
      }

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
        setValid({ found, lauaFromPostcode, userInput });
      }
    } else {
      setValid({ passCheck: false });
    }
  }
  return (
    <main className="w-full h-[100vh] flex mt-12 flex-col items-center">
      <Info />
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl m-4 flex flex-row justify-around px-1.5 py-0.5 bg-[rgba(43,216,114,1)]"
      >
        <div>
          <label htmlFor="postcode">Enter postcode:</label>
          <input
            id="postcode"
            name="postcode"
            placeholder="Postcode ..."
            className="rounded-xl px-2 py-1 m-1 bg-white placeholder:text-gray-500 text-[rgba(63,16,70,1)]"
          ></input>
          <button type="submit">Search</button>
        </div>
      </form>
      {valid.passCheck === false && (
        <p className="text-red-400">Postcode must be valid</p>
      )}
      {valid.found && valid.found.length >= 1 ? (
        <AuthorityDetails valid={valid} />
      ) : valid.lauaFromPostcode !== undefined ? (
        valid.found ? (
          <p>This postcode is not funded</p>
        ) : (
          <p>This postcode doesn't have a laua</p>
        )
      ) : (
        valid.length >= 1 && <p>This postcode is not in our data</p>
      )}
    </main>
  );
}
