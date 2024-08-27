export async function GET(req){
    // gets the pokemon name from the url
    const pokemonName=req.nextUrl.searchParams.get('pokemon');
    try{
        // fetches the pokemon data for the specific pokemon based on the pokemon name from the pokemon official api
        const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data=await res.json();
        
        // returns the pokemon data in JSON format
        return new Response(JSON.stringify(data),{
            headers: {'Content-Type': 'application/json'},
            status: 200
        });
    }catch(e){
        console.error(e); // logs the error for debugging

        // sends the error response if pokemon data is not found
        return new Response(JSON.stringify({error:`No pokemon data available for ${pokemonName}`}),{
            headers: {'Content-Type': 'application/json'},
            status: 404
        });
    }
}