export async function GET() {
    try {
        // Fetches the data from the region
        const res = await fetch(`https://pokeapi.co/api/v2/region/galar`);
        const data = await res.json();
        const pokedexesArr = data.pokedexes; // we get multiple subregions kind off data in it eg:for kanto we get 1) kanto 2)letsgokanto

        // fetch data for those subregions for pokemon entries from that subregion
        const detailedData = pokedexesArr.map(async (val) => {
            const url = await fetch(val.url);
            const url_data = await url.json();
            const pokemonEntriesArr = url_data.pokemon_entries;
            return pokemonEntriesArr;
        })

        // we store this fetched array in this subregionArr variable
        const subRegionsArr = await Promise.all(detailedData);
        let customEntries = []; //to store only name and image as we don't require any other data

        // iterate the subRegion to get the species details from each subregion
        await Promise.all(subRegionsArr.map(async (elememt) => {
            await Promise.all(elememt.map(async (value) => {
                const speciesDetails = await fetch(value.pokemon_species.url);
                const resBody = await speciesDetails.json();

                // we fetch each pokemon name and images from the varieties array of each species
                await Promise.all(resBody.varieties.map(async (variety) => {
                    const pokemonName = variety.pokemon.name;
                    const pokeUrl = await fetch(variety.pokemon.url); // eg:charizard
                    const pokemonDetailedInfo = await pokeUrl.json(); // json body for charizard 
                    const pokemonImgObj = pokemonDetailedInfo.sprites.other; // pokemon Image object as we have many options for images

                    // we store them in this object to make the data small and keep only necessary data
                    const pokemon_with_images = {
                        name: '',
                        images: null
                    }

                    //assignes the name for pokemon and the image object 
                    pokemon_with_images['name']=pokemonName;
                    pokemon_with_images['images']=pokemonImgObj;
                    customEntries.push(pokemon_with_images); // all objects are stored in this array
                }));
            }));
        }));

        // since there are duplicate values involved we filter out the unique values using Map class as it stores the unique keys and its respective values and form the array using Array.from
        const uniquePokemonArr = Array.from(
            new Map(customEntries.map(item => [item.name, item])).values()
        );

        // gives the response as json 
        return new Response(JSON.stringify(uniquePokemonArr), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        console.error(e); // logs any error

        // response as json to user
        return new Response(JSON.stringify({ error: 'Internal Server error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}