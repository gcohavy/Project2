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
        
    }
})