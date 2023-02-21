$ = jQuery;

inputs = $(".student-sandbox-navigation-container .dcg-mq-editable-field");

// testInputs = ["12", "dog", "5"];
testInputs = [
  "1",
  "-1",
  "0",
  "\\frac{1}{2}",
  "100",
  "-100",
  "10000",
  "10000",
  "10^{100000}",
  "-10^{100000}",
  "x=1",
  "x=-1",
  "x=0",
  "x=\\frac{1}{2}",
  "x=100",
  "x=-100",
  "1=x",
  "-1=x",
  "0=x",
  "\\frac{1}{2}=x",
  "100=x",
  "-100=x",
];

output = [];

await loop();

async function loop() {
  for (var i = 0; i < inputs.length; i++) {
    mq = Desmos.MathQuill(inputs[i]);

    for (string of testInputs) {
      mq.latex("");
      mq.latex(string);
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Need to refresh these after setting latex
      inputs = $(
        ".student-sandbox-navigation-container .dcg-mq-editable-field"
      );
      mq = Desmos.MathQuill(inputs[i]);

      foundInput = inputs.eq(i).parents().eq(7).find(".mq-error-message");
      foundTable = $(
        ".student-sandbox-navigation-container .dcg-mq-editable-field"
      )
        .eq(i)
        .parents()
        .eq(7)
        .find(".table-error-message");
      // console.log(inputs[i]);
      // console.log(foundInput);

      if (foundInput.length > 0) {
        warning = mq.getAriaPostLabel();
        outStr = `Math Input [${
          i + 1
        }] has warning on input ${mq.latex()}:\n\t${warning}`;
        // console.log(outStr);
        output.push(outStr);
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      } else if (foundTable.length > 0) {
        outStr = `Table Input [${
          i + 1
        }] has warning on input ${mq.latex()}:\n\tCan't currently display table warnings.`;
        // console.log(outStr);
        output.push(outStr);
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      } else {
        outStr = `Input [${
          i + 1
        }] has NO warning on input ${mq.latex()}\n\tN/A.`;
        // console.log(outStr);
        output.push(outStr);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

console.log("Final output:");
console.log(output.join("\n"));
