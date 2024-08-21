import React, { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import { units } from "../units";

function App() {
  const [result, setResult] = useState(0);

  return (
    <>
      <div className="converter-form">
        {/* Input with label "Amount" here */}

        <div className="row">
          {/* Selects with labels "From" and "To" here */}

          <button>Convert</button>
        </div>
      </div>

      <div id="result">
        Result is: <span data-testid="result">{result}</span>
      </div>
    </>
  );
}

export default App;
