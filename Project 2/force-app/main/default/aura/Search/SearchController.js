({
	search : function(component, event, helper) {
        let action = component.get('c.getExternalPokemon');
        let pokemon=component.get('v.stringInput');
        action.setParams({searchItem: pokemon});
        action.setCallback(this, (res) => {
            if(res.getState() == 'SUCCESS' && res.getReturnValue != 'Pokemon not found') {
            	let retPok = JSON.parse(res.getReturnValue());
            	component.set('v.HP', retPok.stats[0].base_stat);
            	component.set('v.Attack', retPok.stats[1].base_stat);
            	component.set('v.Defense', retPok.stats[2].base_stat);
            	component.set('v.Type', retPok.types[0].type.name);
            	component.set('v.ImageURL', retPok.sprites.front_default);
            	component.set('v.Experience', retPok.base_experience);
            	component.set('v.Error', null);
            	console.log(retPok.stats[0].base_stat);
        	} else {
            	component.set('v.Error', res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})