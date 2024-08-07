const fs = require('fs');
const path = require('path');

const wordsDirectory = './assets/Words_Data'; // Adjust path as needed
const outputFilename = './wordsData.json'; // Output JSON file

function processDirectories() {
  fs.readdir(wordsDirectory, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error("Error reading words directory:", err);
      return;
    }

    const wordsData = [];

    entries.forEach(entry => {
      if (entry.isDirectory()) {
        const wordEnglish = entry.name;
        const directoryPath = path.join(wordsDirectory, wordEnglish);
        const hindiFilePath = path.join(directoryPath, `${wordEnglish} Hindi.txt`);
        const soundFilePath = path.join(directoryPath, `${wordEnglish}.ogg`); // Assuming a consistent naming convention

        try {
          const hindiData = fs.readFileSync(hindiFilePath, 'utf8').trim();
          
          wordsData.push({
            english: wordEnglish,
            hindi: hindiData,
            sound: soundFilePath
          });
        } catch (readError) {
          console.error(`Error reading files for ${wordEnglish}:`, readError);
        }
      }
    });

    // Once all directories are processed, write to a JSON file
    fs.writeFile(outputFilename, JSON.stringify(wordsData, null, 2), err => {
      if (err) {
        console.error("Error writing JSON data:", err);
        return;
      }
      console.log("Words data has been compiled into JSON!");
    });
  });
}

processDirectories();
