module.exports = new Promise((resolve, reject) => {

  const algorithmFolder = './algorithms/';
  const fs = require('fs');

  let availableAlgorithmNames = [];
  let chosenAlgorithmNames = [];

  new Promise((resolve, reject) => {
    fs.readdir(algorithmFolder, (err, files) => {
      files.forEach((file) => availableAlgorithmNames.push(file.replace(".js", "")));
      resolve();
    });
  }).then(() => {
    console.log("available algorithms: \n");

    availableAlgorithmNames.forEach(name => console.log('  ' + name));

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nWhich algorithms do you wish to use? (space as separator) `, (input) => {
      chosenAlgorithmNames = input.split(" ", 20);
      readline.close();

      let okNames = chosenAlgorithmNames.filter(function (algorithmName) {
        return (this.indexOf(algorithmName) >= 0);
      }, availableAlgorithmNames);

      resolve(okNames);
    });
  });
});
