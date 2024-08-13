export async function GET(req){
    const pokemon =req.nextUrl.searchParams.get('pokemon');    
    try{
        const res =await fetch(`http://localhost:3000/api/getpokemon?pokemon=${pokemon}`);
        const data=await res.json();
        const movesArr=data.moves.map(async(eachMove)=>{
            const url= await fetch(eachMove.move.url);
            const url_data=await url.json();
            return url_data;          
        })
        const detailedResponse = await Promise.all(movesArr);
        const reducedMovesArr=new Array();
        for(let i=0;i<10;i++){
            reducedMovesArr.push(detailedResponse[i]);
        }
        
        return new Response(JSON.stringify(reducedMovesArr),{
            headers:{'Content-Type': 'application/json'},
            status: 200
        });
    }catch(e){
        return new Response(JSON.stringify({error:'Internal Server Error'},{
            headers:{'Content-Type': 'application/json'},
            status: 500
        }));
    }
}