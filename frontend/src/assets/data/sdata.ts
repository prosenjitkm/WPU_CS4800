// Read the input JSON file
import * as fs from 'fs';
import * as path from 'path';
// Read the JSON file data
const jsonData = fs.readFileSync('products.json', 'utf8');

// Parse the JSON data
const data = JSON.parse(jsonData);

// Function to double values
function mapp(obj: { [key: string]: string }): { [key: string]: string } {
  const result: { [key: string]: string } = {};
  this.products.forEach(product => {
    product.category.forEach((category) => {
      const categoryName: string = category.name;

      // Check if the category exists in the map
      if (!categorisations[categoryName]) {
        categorisations[categoryName] = [];
      }

      // Push the product URL to the respective category in the map
      categorisations[categoryName].push(product.url);
    });
  });
  })

  return result;
}

// Perform the function operation on the data
const doubledData = mapp(data);

// Convert the result to a string
const resultString = JSON.stringify(doubledData, null, 2);

// Write the result to a text file
fs.writeFileSync('output.txt', resultString);

console.log('Result has been saved to output.txt');

mapper(): { [key: string]: string[] }
{
  const categorisations: { [key: string]: string[] } = {};

  // Iterate through each product


  console.log(Object.keys(this.products));
  console.log(Object.values(categorisations))

  return categorisations;
}
