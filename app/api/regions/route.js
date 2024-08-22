export async function GET() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/region/galar`);
        const data = await res.json();
        const pokedexesArr = data.pokedexes;
        const detailedData = pokedexesArr.map(async (val) => {
            const url = await fetch(val.url);
            const url_data = await url.json();
            const pokemonEntriesArr = url_data.pokemon_entries;
            return pokemonEntriesArr;
        })
        const subRegionsArr = await Promise.all(detailedData);
        let customEntries = [];
        await Promise.all(subRegionsArr.map(async (elememt) => {
            await Promise.all(elememt.map(async (value) => {
                const speciesDetails = await fetch(value.pokemon_species.url);
                const resBody = await speciesDetails.json();
                await Promise.all(resBody.varieties.map(async (variety) => {
                    const pokemonName = variety.pokemon.name;
                    const pokeUrl = await fetch(variety.pokemon.url);
                    const pokemonDetailedInfo = await pokeUrl.json();
                    const pokemonImgObj = pokemonDetailedInfo.sprites.other;
                    const pokemon_with_images = {
                        name: '',
                        images: null
                    }
                    pokemon_with_images['name']=pokemonName;
                    pokemon_with_images['images']=pokemonImgObj;
                    customEntries.push(pokemon_with_images);
                }));
            }));
        }));

        const uniquePokemonArr = Array.from(
            new Map(customEntries.map(item => [item.name, item])).values()
        );

        return new Response(JSON.stringify(uniquePokemonArr), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: 'Internal Server error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}