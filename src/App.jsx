import "./style.css";
import postcodes1 from "./utilities/postcodes1.json";
import postcodes2 from "./utilities/postcodes2.json";
import lcs from "./utilities/LEPs-&-CAs(1).json";
import { useState } from "react";
import AuthorityDetails from "./components/AuthorityDetails";
import Info from "./components/Info";

export default function App() {
  const [valid, setValid] = useState({});

  //listen to postcode input if it is valid length search the json for the postcode
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    const regex =
      /^[A-Z]([0-9]{1,2}|([A-Z][0-9]([0-9]|[A-Z])?)|[0-9][A-Z])[0-9][A-Z]{2}$/i;

    const userInput = data.postcode
      .replaceAll(/\s*/g, "")
      .match(regex)?.[0]
      .toUpperCase(); //This removes all spaces from the user input checks if it matchs the regex above and then makes the matched group uppercase

    console.log(userInput);
    if (userInput) {
      let lauaFromPostcode;
      if (userInput.localeCompare("LS") === -1) {
        lauaFromPostcode = postcodes1.find((postcode) => {
          return postcode.pcd.replaceAll(/\s*/g, "") == userInput;
        })?.laua;
      } else {
        lauaFromPostcode =
          postcodes2.find((postcode) => {
            return postcode.pcd.replaceAll(/\s*/g, "") == userInput;
          })?.laua | false;
      }

      if (lauaFromPostcode === false) {
        //doesn't exist
        console.log("doesn't exist", lauaFromPostcode);
        console.log(valid);
        setValid({ lauaFromPostcode });
      } else if (lauaFromPostcode === "") {
        //doesn't have a laua
        console.log("doesn't have a laua", lauaFromPostcode);
        setValid({ lauaFromPostcode });
      } else {
        console.log(lauaFromPostcode);
        const found = lcs.filter((lepCA) => {
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
        className="rounded-2xl m-4 flex flex-row justify-around px-2 py-1 bg-[rgba(43,216,114,1)] items-center gap-3"
      >
        <label htmlFor="postcode" className="flex-1/4">
          Enter postcode:
        </label>
        <div className="flex flex-row">
          <input
            id="postcode"
            name="postcode"
            placeholder="Postcode ..."
            className="rounded-l-xl px-2 py-1 bg-white flex-2/4 placeholder:text-gray-500 text-[rgba(63,16,70,1)] max-w-[212px] w-[40vw]"
          ></input>
          <button
            type="submit"
            className="flex-1/4 bg-[white] rounded-r-2xl pr-2 hover:cursor-pointer w-[40px] h-[40px] flex justify-center items-center"
          >
            <img src="/magnifying-glass.png" width={30} height={30} />
          </button>
        </div>
      </form>
      {valid.passCheck === false && (
        <p className="text-red-400">Postcode must be valid</p>
      )}
      {valid.lauaFromPostcode === false ? (
        <p className="text-red-400">This postcode is not in our data</p>
      ) : valid.lauaFromPostcode === "" ? (
        <p className="text-red-400">This postcode doesn't have a laua</p>
      ) : valid.found ? (
        valid.found.length >= 1 ? (
          <AuthorityDetails valid={valid} />
        ) : (
          <p className="text-red-400">
            This postcode does not have any associated CA's or LEP's in our data
            check with Rich
          </p>
        )
      ) : (
        <></>
      )}
    </main>
  );
}
