array_word = [];
function draw(words) {
  svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`)
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", (d) => `${d.size}px`)
    .style("font-family", "Impact")
    .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
    .attr("text-anchor", "middle")
    .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
    .text((d) => d.text);
}



function printFrequency(str, arr) {
  // Create a new Map to store the frequency counts
  let M = new Map();

  // String for storing the words
  let word = "";

  // Loop through each character in the string
  for (let i = 0; i < str.length; i++) {
    // Check if current character is a blank space
    if (str[i] === " ") {
      // If the current word is not found then insert it
      // into the Map with frequency 1
      if (!M.has(word)) {
        M.set(word, 1);
        word = "";
      }
      // If the current word is already in the Map, update its frequency count
      else {
        M.set(word, M.get(word) + 1);
        word = "";
      }
    }
    // If the current character is not a blank space,
    // add it to the current word
    else {
      word += str[i];
    }
  }

  // Check if the last word in the string is already in the Map,
  // and update its frequency count if it is
  if (!M.has(word)) {
    M.set(word, 1);
  } else {
    M.set(word, M.get(word) + 1);
  }

  // sorting map key in increasing order
  M = new Map([...M.entries()].sort());

  // Loop through each key-value pair in the Map and
  // append the frequency count of each word to the array
  for (let [key, value] of M) {
    arr.push(`${key} - ${value}`);
  }
}





if (dist <= locaterRadius) {
  Rev = d.Reviews;
  printFrequency(Rev, array_word);

  console.log(Rev, "in range");
}
console.log(typeof array_word);
const jo = JSON.parse(array_word);

const ss = Object.entries(jo);
console.log(typeof ss);
const wordFrequencies = jo.reduce((acc, item) => {
  const [word, frequency] = item.split(" - ");
  acc[word] = parseInt(frequency);
  return acc;
}, {});

const wordCloudData = Object.keys(wordFrequencies).map((word) => ({
  text: word,
  size: wordFrequencies[word],
}));
const layout = d3.layout
  .cloud()
  .size([width, height])
  .words(wordCloudData)
  .padding(5)
  .rotate(() => ~~(Math.random() * 2) * 90)
  .font("Impact")
  .fontSize((d) => d.size * 10)
  .on("end", draw);

layout.start();
