export async function GET(req) {
    // gets the pokemon type name from the url
    const type=req.nextUrl.searchParams.get('type');
    
    try {
        // fetches the data for the pokemon type to determine its strength,weakness,etc against other pokemon types
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if(!res.ok){
            throw new Error('Error while fetching data for move effectiveness',res.statusText);
        }
        const data = await res.json();
        const damage_relations=data.damage_relations;// returns the damage relations array

        // sends the damage relations data as a JSON object
        return new Response(JSON.stringify(damage_relations), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    }catch(e){
        console.error(e); // logs the error for debugging

        // displays the error message to the user in json format
        return new Response(JSON.stringify({error:'Internal Server Error'}),{
            headers:{'Content-Type': 'application/json'},
            status: 500
        });
    }
}