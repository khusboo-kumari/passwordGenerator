import { useState, useCallback, useEffect, useRef } from "react";

const Password = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //  useRef hook
  const passwordRef = useRef(null); // null here means, initially there is no reference .

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~<>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    //  Now read the value
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]); // This setPassword is just used for Optimisation only, to keep it in the cache Memory , not so necessary btw .

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  //   passwordGenerator() ;
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="  w-full max-w-lg max-w-auto  mx-auto  shadow-md rounded-lg  px-4 my-8 text-orange-600 bg-gray-700 py-8 md:py-16">
        <h1 className="mb-4 text-center text-xl md:text-2xl">Password Generator </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          {" "}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3  text-2xl"
            placeholder="password..."
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none text-white bg-lime-900 px-4 py-1 shrink-0 hover:bg-lime-400 transition-colors"
          >
            copy
          </button>
        </div>

        <div className="flex  flex-col md:flex-row md:justify-between md:gap-x-4  text-sm gap-y-4">
          <div className="flex  items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer flex-grow"
              //   Now make the range dynamic according to the lengh
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              // Means true and false will be flipped
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="whitespace-nowrap">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};
export default Password;
