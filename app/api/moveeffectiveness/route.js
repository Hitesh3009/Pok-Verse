export async function GET(req) {
    const type=req.nextUrl.searchParams.get('type');
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if(!res.ok){
            throw new Error('Error while fetching data for move effectiveness',res.statusText);
        }
        const data = await res.json();
        const damage_relations=data.damage_relations;

        return new Response(JSON.stringify(damage_relations), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    }catch(e){
        console.error(e);
        return new Response(JSON.stringify({error:'Internal Server Error'}),{
            headers:{'Content-Type': 'application/json'},
            status: 500
        });
    }
}