({
    //Method to search for a pokemon in external API
	search : function(component, event, helper) {
        let action = component.get('c.getExternalPokemon');
        let pokemon = component.get('v.stringInput').toLowerCase();

        action.setParams({searchItem: pokemon});
        action.setCallback(this, (res) => {
            if(res.getState() == 'SUCCESS' && res.getReturnValue != 'Pokemon not found') {
            	let retPok = JSON.parse(res.getReturnValue());
            	component.set('v.HP', retPok.stats[0].base_stat);
            	component.set('v.stringInput', pokemon);
            	component.set('v.Attack', retPok.stats[1].base_stat);
            	component.set('v.Defense', retPok.stats[2].base_stat);
            	component.set('v.Type', retPok.types[0].type.name);
            	component.set('v.ImageURL', retPok.sprites.front_default);
            	component.set('v.Experience', retPok.base_experience);
            	component.set('v.Error', null);
            	component.set('v.buttonDisabled', false);
        	} else {
            	component.set('v.Error', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
    //Method to add Pokemon to the DB
    addNewPokemon: function(component, event, helper) {
        let button = event.getSource();
        let action = component.get('c.addPokemon');

        button.set('v.disabled', true);
        action.setParams({ Name: component.get('v.stringInput'),
                          Typ: component.get('v.Type'),
                          ImageURL: component.get('v.ImageURL'),
                          HP: component.get('v.HP'),
                          Attack: component.get('v.Attack'),
                          Defense: component.get('v.Defense'),
                          Experience: component.get('v.Experience'),
                          UserId: $A.get('$SObjectType.CurrentUser.Id')});
        //console.log($A.get('$SObjectType.CurrentUser.Id'));
        action.setCallback(this, (res)=>{
            if(res.getState() == 'SUCCESS') {
            	//console.log(res.getReturnValue());
            	let NewPokemon = $A.get('e.c:UpdatePokemon');
            	NewPokemon.fire();
        	} else if (res.getState() == 'ERROR'){
                console.log(res.getError());
            } else {
        		console.log('Error connecting to DB: ' + res.getReturnValue());
        		console.log('state: ' + res.getState());
            }
        });
		$A.enqueueAction(action);
    }
})