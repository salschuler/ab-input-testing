$ = jQuery;

inputs = $(".student-sandbox-navigation-container .dcg-mq-editable-field");

testInputs = ["12", "dog", "5"];

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

      found = inputs.eq(i).parents().eq(7).find(".mq-error-message");
      console.log(inputs[i]);
      console.log(found);
      if (found.length > 0) {
        warning = mq.getAriaPostLabel();
        outStr = `Math Input [${
          i + 1
        }] has warning on input ${mq.latex()}:\n\t${warning}`;
        console.log(outStr);
        output.push(outStr);
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      }

      found = $(".student-sandbox-navigation-container .dcg-mq-editable-field")
        .eq(i)
        .parents()
        .eq(7)
        .find(".table-error-message");
      if (found.length > 0) {
        outStr = `Table Input [${
          i + 1
        }] has warning on input ${mq.latex()}:\n\tCan't currently display table warnings.`;
        console.log(outStr);
        output.push(outStr);
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

console.log(output.join("\n"));
