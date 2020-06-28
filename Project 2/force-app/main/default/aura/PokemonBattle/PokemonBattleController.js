({
	doInit : function(component, event, helper) {
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
    battle : function(component, event, helper) {
        let button = event.getSource();
        button.set('v.disabled', true);
        let playerStats = 0;
        let playerPokemon = component.get('v.playerPokemon');
        playerPokemon.forEach( (p) => {
            playerStats += p.HP__c + p.Attack__c + p.Defense__c + p.Experience__c;
        });
        let enemyStats = 0;
        let enemyPokemon = component.get('v.enemyPokemon');
        enemyPokemon.forEach((p) => {
            enemyStats += p.stats;
        });
        console.log('Player stats: ' + playerStats + '\nEnemy stats: ' + enemyStats);
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