declare module "@salesforce/apex/PokemonController.getWinLoss" {
  export default function getWinLoss(param: {playerId: any}): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.getExternalPokemon" {
  export default function getExternalPokemon(param: {searchItem: any}): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.addPokemon" {
  export default function addPokemon(param: {Name: any, Typ: any, ImageURL: any, HP: any, Attack: any, Defense: any, Experience: any, UserId: any}): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.getPlayerPokemon" {
  export default function getPlayerPokemon(param: {UserId: any}): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.setBattlePokemon" {
  export default function setBattlePokemon(param: {incoming: any, userId: any}): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.getRandomPokemon" {
  export default function getRandomPokemon(): Promise<any>;
}
declare module "@salesforce/apex/PokemonController.postBattleUpdate" {
  export default function postBattleUpdate(param: {input: any, result: any, UserId: any}): Promise<any>;
}
