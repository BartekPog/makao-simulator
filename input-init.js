module.exports = new Promise((resolve, reject) => {
  //resolve(['random', 'random','random']);


  const algorithmFolder = './algorithms/';
  const fs = require('fs');

  let availableAlgorithmNames = [];
  let chosenAlgorithmNames = [];

  new Promise((resolve, reject) => {
    fs.readdir(algorithmFolder, (err, files) => {
      files.filter(file => file.search("-alg.js") >= 0).forEach((file) => availableAlgorithmNames.push(file.replace("-alg.js", "")));
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

      let okNames = chosenAlgorithmNames.filter(function(algorithmName) {
        return (this.indexOf(algorithmName) >= 0);
      }, availableAlgorithmNames);

      console.log('\nPlayers (algorithms) array: ');
      console.log(okNames);
      console.log();

      resolve(okNames);
    });
  });
});
