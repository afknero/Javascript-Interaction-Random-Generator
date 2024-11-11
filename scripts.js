/**
 * Write a function called generate that will take one argument (your visitor's
 * name or something else) and prints a randomly generated response, pulling
 * random options from an array, into an element of your page. The output needs
 * to include the argument typed by the viewer– ex "Effie, your fortune is..."
 */

async function generate() {
  const outputDiv = document.querySelector('#generated-output');
  const username = document.querySelector('#username').value.trim();

  if (!username) {
    outputDiv.innerText = 'Please enter your name!';
    return;
  }

  const responses = [
    'is ready to battle!',
    'is destined to become a legend!',
    'is preparing for a tough fight!',
    'is ready to take on the world!',
    'is about to evolve!',
    'is searching for a new challenge!',
    'has a surprise for you!',
  ];

  // select a random response
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  // generate a pokemon ID based on the user's name
  const nameHash = Array.from(username).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  const pokemonId = (nameHash % 898) + 1;

  try {
    // fetch pokemon data
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );
    const pokemon = await response.json();

    // display pokemon data
    outputDiv.innerHTML = `
      <h2>${
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1) +
        ' ' +
        randomResponse
      }</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>Type: ${pokemon.types
        .map((type) => `<span class="type">${type.type.name}</span>`)
        .join(', ')}</p>
    `;
    // trigger re-style
    restyle();
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    outputDiv.innerText = 'Failed to generate Pokémon. Please try again.';
  }
}

/**
 * Write a function called restyle that applies new CSS styles to the output text
 * in a random manner each time it fires. Modify at least three CSS properties.
 */

function restyle() {
  const outputDiv = document.querySelector('#generated-output');

  const bgColors = [
    '#A4A5E7',
    '#A29EE4',
    '#94DCDA',
    '#B6B6B6',
    '#99AEEE',
    '#9AB1ED',
    '#93CBEA',
    '#A5B9D2',
  ];

  const txColors = [
    '#3B3C80',
    '#36307E',
    '#1B7A79',
    '#555555',
    '#264F83',
    '#275583',
    '#197281',
    '#385F6B',
  ];
  // select random colors
  const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  const randomTxColor = txColors[Math.floor(Math.random() * txColors.length)];
  const randomTxShadow = `${Math.floor(Math.random() * 2) + 1}px ${
    Math.floor(Math.random() * 2) + 1
  }px 4px rgba(0, 0, 0, 0.2)`;

  // apply random styles
  outputDiv.style.backgroundColor = randomBgColor;
  outputDiv.style.color = randomTxColor;
  outputDiv.style.textShadow = randomTxShadow;
}
