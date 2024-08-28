export async function GET(req) {
    // gets the pokemon name from the url
    const pokemon = req.nextUrl.searchParams.get('pokemon');
    try {
        // fetches the custom api for the pokemon details like the moves it performs
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon?pokemon=${pokemon}`);
        const data = await res.json();
        
        // stores the moves array of the specified pokemon
        const movesArr = data.moves.map(async (eachMove) => {
            const url = await fetch(eachMove.move.url);
            const url_data = await url.json();
            return url_data;
        })

        // stores pokemon types as we will be displaying only the attacks based on its type
        const pokemonType = [];

        // since one pokemon can have more than one type we iterate through the types array we got from api and store it in the pokemonType array
        for (let i = 0; i < data.types.length; i++) {
            const type = data.types[i].type.name;
            pokemonType.push(type);
        }

        // we resolve all the promises returned by the movesArr array
        const detailedResponse = await Promise.all(movesArr);

        // used to store the reduced form of the total moves array
        const reducedMovesArr = [];

        // since the data for the moves is huge in amount we only select 7 from the total to display
        for(let i = 0; i < detailedResponse.length; i++){
            const ele=detailedResponse[i];

            // checks if ele contains the data like type, effect_entries i.e. data should not be null
            if(ele && ele.type && ele.effect_entries && ele.effect_entries.length > 0){
                const moveType = ele.type.name; // move type name
                const moveName = ele.name; // move name
                const moveEffect = ele.effect_entries[0].effect; // effect caused by move

                // iterates the pokemon type array so that only moves with the pokemon types are stored in array as objects
                for(let j=0;j<pokemonType.length;j++){
                    if (moveType === pokemonType[j]) {
                        // once the array reaches length 7 we break the loop
                        if(reducedMovesArr.length===7){
                            break;
                        }

                        // we push the following custom object since we don't need the whole data,which in turn reduces the processing time of the application
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
    // sends the response of the reduced array of moves as json object
        return new Response(JSON.stringify(reducedMovesArr), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        console.error(e); // logs the error for debugging

        // displays the error message to the user in json format
        return new Response(JSON.stringify({ error: 'Internal Server Error' }, {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        }));
    }
}