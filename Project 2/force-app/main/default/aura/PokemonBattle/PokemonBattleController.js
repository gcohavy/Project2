({
    //Method to get 3 random pokemon on initialization and assign them
    //to the enemyPokemon variable with appropriate info
    //Note that this requires a server call, and a call to an external API
    //  which can potentially result in a much slower response time.
    //  Potential fix can be to asynchronously get the 3 random pokemon
    //  when the parent component is rendered and assign them on declaration 
    //  of the component itself.
	doInit : function(component, event, helper) {
        //Get the 3 random pokemon
		let action = component.get('c.getRandomPokemon');
        action.setCallback(this, (res) => {
            let jsonInstance;
            let returnArray = [];
            if(res.getState() == 'SUCCESS') {
            	//console.log('Successful status')
            	let resArray = res.getReturnValue();
                resArray.forEach((res) => {
                	jsonInstance = JSON.parse(res);
                    returnArray.push({name: jsonInstance.forms[0].name,
                        image: jsonInstance.sprites.front_default,
            			stats: jsonInstance.stats[0].base_stat + 
            					jsonInstance.stats[1].base_stat + 
            					jsonInstance.stats[2].base_stat + 
            					jsonInstance.base_experience });
            	});
    			component.set('v.enemyPokemon', returnArray);
        	} else {
                console.log('Could not return nothin');
            }
        });
		$A.enqueueAction(action);
    },
    //Method containing the logic that determines battle results after the 
    //button is clicked
    battle : function(component, event, helper) {
        let button = event.getSource();
        let playerStats = 0;
        let playerPokemon = component.get('v.playerPokemon');
        let enemyStats = 0;
        let enemyPokemon = component.get('v.enemyPokemon');

        //Do not allow the button to be clicked again
        button.set('v.disabled', true);
        //Determine player and enemy comparison
        playerPokemon.forEach( (p) => {
            playerStats += p.HP__c + p.Attack__c + p.Defense__c + p.Experience__c;
        });
        enemyPokemon.forEach((p) => {
            enemyStats += p.stats;
        });
        console.log('Player stats: ' + playerStats + '\nEnemy stats: ' + enemyStats);
        //Compare stats and determine result message to be interpreted in Apex controller
        if (playerStats >= enemyStats) {
            component.set('v.battleResult', 'YOU WIN');
        } else {
            component.set('v.battleResult', 'YOU LOSE');
        }
        component.set('v.battleOver', true);
        //Call method to update DB
        let action = component.get('c.postBattleUpdate');
        action.setParams({input: component.get('v.playerPokemon'),
            				result: component.get('v.battleResult'),
            				UserId: $A.get('$SObjectType.CurrentUser.Id')});
        action.setCallback(this, (res) => {
            console.log('DB updated');
        });
        $A.enqueueAction(action);
    }
})