({
    //Method to load pokemon initially. Logic is in the helper
	doInit : function(component, event, helper) {
        //console.log('Initialization begun');
		helper.loadPokemon(component);
		//console.log('Initialization complete');
    },
    //Method to fire the battle event after clicking the button
    fight : function(component, event, helper) {
        let beginFight = $A.get('e.c:BattleBegun');
        beginFight.setParams({"playerPokemon": component.get("v.Pokemon")});
        beginFight.fire();
    },
    //Method to update the pokemon after one is added. Logic is in the helper
    update: function(component, event, helper) {
        console.log('Inside event handler');
        helper.loadPokemon(component);
    }
})