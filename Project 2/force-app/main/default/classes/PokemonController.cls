public with sharing class PokemonController {
    @AuraEnabled
    public static String getExternalPokemon(String searchItem) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://pokeapi.co/api/v2/pokemon/' + searchItem);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        System.debug( 'Status Code: ' + response.getStatusCode() + '\nResponse Body: ' + response.getBody());
        if(response.getStatusCode()==200) {
            return response.getBody();
        } else {
            return 'Pokemon not found';
        }
    }
}