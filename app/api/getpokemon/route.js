export async function GET(req){
    const pokemonName=req.nextUrl.searchParams.get('pokemon');
    try{
        const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data=await res.json();
        
        return new Response(JSON.stringify(data),{
            headers: {'Content-Type': 'application/json'},
            status: 200
        });
    }catch(e){
        return new Response(JSON.stringify({error:`No pokemon data available for ${pokemonName}`,status: 404}),{
            headers: {'Content-Type': 'application/json'},
        });
    }
}