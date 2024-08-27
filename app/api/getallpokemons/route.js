export async function GET(req) {
    // gets the offset value from the request and passes it to pokemon api for data fetching
    const offset=req.nextUrl.searchParams.get('offset');
    
    try {
        // Pokemon external API
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=12`);
        const data = await res.json();
        // console.log(data.count);
        
        // processes/fetches the url/api that are present the data.results array
        const detailedPokemonData = data.results.map(async (currentPokemon) => {
            const url = await fetch(currentPokemon.url);
            const url_data = await url.json();
            return url_data;
        });

        // gets the response after all the promises are resolved
        const detailedResponse=await Promise.all(detailedPokemonData);
         
        // returns the response as json
        return new Response(JSON.stringify({totalCount:data.count,detailedResponse}), {
            headers: { 'Content-Type': 'application/json',
                'Cache-Control':'no-store, no-cache, must-revalidate, proxy-revalidate'
            },
            status:200
        });
    } catch (e) {
        console.error(e); // logs the error for debugging
        // displays the error to user in json format
        return new Response(JSON.stringify({error:'Internal server error'}), {
            headers: { 'Content-Type': 'application/json' },
            status:500
        });
    }
}