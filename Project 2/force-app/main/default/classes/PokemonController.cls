public class PokemonController {
    //Method to get the players win/loss ratio and return as a string
    @AuraEnabled
    public static String getWinLoss(String playerId) {
        Id conId = [SELECT ContactId FROM User WHERE Id=:playerId].ContactId;
        Contact player = [SELECT Name, Wins__c, Losses__c FROM Contact WHERE Id=:conId];
        //System.debug(player.Name + ' Win/Loss: ' + player.Wins__c + '/' + player.Losses__c);
        return player.Name + ' - Win/Loss: ' + player.Wins__c + '/' + player.Losses__c;
    }
    
    //Method to connect to external API and return a string of JSON 
    //(Which is easier to parse through with JS)
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
    
    //Method to add the new Pokemon to the DB
    @AuraEnabled
    public static String addPokemon(String Name, String Typ, 
                                        String ImageURL, Integer HP, 
                                        Integer Attack, Integer Defense, 
                                        Integer Experience, String UserId) {
        //Id GabId = [SELECT Id FROM User WHERE lastName='Cohavy'].Id;
        //Id ExtId = [SELECT Id FROM User WHERE lastName='Beast'].Id;
        //UserId = ExtId;
        //UserId='0053h000002zQBtAAM';
        //System.debug(UserId);
        Id conId = [SELECT ContactId FROM User WHERE Id=:UserId].ContactId;
        System.debug(conId);
        Pokemon__c newPok = new Pokemon__c(Name=Name, 
                                           Type__c=Typ, 
                                           ImageURL__c=ImageURL, 
                                           HP__c=HP, 
                                           Attack__c=Attack, 
                                           Defense__c=Defense, 
                                           Experience__c = Experience,
                                           Player__c=conId);
        System.debug(newPok);
        Database.saveResult sr = Database.insert(newPok, false);
        System.debug(sr.getErrors());
        return 'Pokemon Inserted into DB';
    }
    
    //Method to get Player's existing pokemon from the DB
    @AuraEnabled
    public static List<Pokemon__c> getPlayerPokemon(String UserId) {
        Id conId = [SELECT ContactId FROM User WHERE Id=:UserId].ContactId;
        List<Pokemon__c> Pokemon = [SELECT Name, Type__c, ImageURL__c, HP__c, Attack__c, Defense__c, 
                                    Experience__c, Fighter__c
                                   FROM Pokemon__c WHERE Player__c=:conId];
        return Pokemon;
    }
    
    //Method to set up battle
    @AuraEnabled
    public static List<Pokemon__c> setBattlePokemon(List<Pokemon__c> incoming, ID userId) {
        Id conId = [SELECT ContactId FROM User WHERE Id=:UserId].ContactId;
        //update incoming pokemon
        update incoming;
        //Select the first 3 pokemon who will fight and add them to return Array
        List<Pokemon__c> returnArray = [SELECT Name, Type__c, ImageURL__c, HP__c, Attack__c, Defense__c, 
                                    	Experience__c, Fighter__c, Wins__c, Losses__c
                                   		FROM Pokemon__c WHERE Player__c=:conId AND Fighter__c=true LIMIT 3];
        return returnArray;
    }
    
    //Method to get 3 random Pokemon
    @AuraEnabled
    public static List<String> getRandomPokemon() {
        List<String> results = new List<String>();
        //Get random index
        Integer searchInt;
        for(Integer i=0; i<3;i++) {
            do {
                searchInt = Integer.valueOf(Math.random()*1000);
            } while (searchInt > 807);
            System.debug(searchInt);
            //Get random pokemon name using index
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://pokeapi.co/api/v2/pokemon/' + searchInt);
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            if(response.getStatusCode()==200){
                System.debug('response body: ' + response.getBody());
                results.add(response.getBody());
            } else {
                System.debug('Something went wrong');
        		System.debug( 'Status Code: ' + response.getStatusCode() + '\nResponse Body: ' + response.getBody());
            }
        }
        return results;
    }
    
    //Method to update pokemon and player post-battle
    @AuraEnabled
    public static void postBattleUpdate(List<Pokemon__c> input, String result, ID UserId) {
        Id conId = [SELECT ContactId FROM User WHERE Id=:UserId].ContactId;
        for (Pokemon__c p : input) {
            if(result=='YOU WIN') {
                p.Wins__c += 1;
            } else {
                p.Losses__c += 1;
            }
            p.Experience__c +=2;
        }
        update input;
        Contact player = [SELECT Id, Wins__c, Losses__c FROM Contact WHERE Id=:conId];
        if (result =='YOU WIN') {
            player.Wins__c += 1;
        } else {
            player.Losses__c += 1;
        }
        update player;
    }
}