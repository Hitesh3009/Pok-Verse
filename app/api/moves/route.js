export async function GET(req) {
    const pokemon = req.nextUrl.searchParams.get('pokemon');
    try {
        const res = await fetch(`http://localhost:3000/api/getpokemon?pokemon=${pokemon}`);
        const data = await res.json();
        const movesArr = data.moves.map(async (eachMove) => {
            const url = await fetch(eachMove.move.url);
            const url_data = await url.json();
            return url_data;
        })
        const pokemonType = [];
        for (let i = 0; i < data.types.length; i++) {
            const type = data.types[i].type.name;
            pokemonType.push(type);
        }

        console.log(pokemonType);
        const detailedResponse = await Promise.all(movesArr);
        const reducedMovesArr = [];
        for(let i = 0; i < detailedResponse.length; i++){
            const ele=detailedResponse[i];
            if(ele && ele.type && ele.effect_entries && ele.effect_entries.length > 0){
                const moveType = ele.type.name;
                const moveName = ele.name;
                const moveEffect = ele.effect_entries[0].effect;
                for(let j=0;j<pokemonType.length;j++){
                    if (moveType === pokemonType[j]) {
                        if(reducedMovesArr.length===10){
                            break;
                        }
                        else{
                            reducedMovesArr.push(
                                {
                                    move_name: moveName,
                                    move_effect: moveEffect,
                                    move_type: moveType
                                }
                            );
                        }
                    }
                }
        }
    }
        return new Response(JSON.stringify(reducedMovesArr), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }, {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        }));
    }
}