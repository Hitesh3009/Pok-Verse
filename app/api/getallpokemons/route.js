export async function GET(req) {
    const offset=req.nextUrl.searchParams.get('offset');
    console.log(offset);
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=12`);
        const data = await res.json();

        const detailedPokemonData = data.results.map(async (currentPokemon) => {
            const url = await fetch(currentPokemon.url);
            const url_data = await url.json();
            return url_data;
        });
        const detailedResponse=await Promise.all(detailedPokemonData);
         
        return new Response(JSON.stringify(detailedResponse), {
            headers: { 'Content-Type': 'application/json',
                'Cache-Control':'no-store, no-cache, must-revalidate, proxy-revalidate'
            },
            status:200
        });
    } catch (e) {
        return new Response(JSON.stringify({error:'Internal server error',status:500}), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}