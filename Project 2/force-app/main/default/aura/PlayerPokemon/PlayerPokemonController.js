({
	doInit : function(component, event, helper) {
        //console.log('Initialization begun');
		helper.loadPokemon(component);
		//console.log('Initialization complete');
	},
    fight : function(component, event, helper) {
        let beginFight = $A.get('e.c:BattleBegun');
        beginFight.setParams({"playerPokemon": component.get("v.Pokemon")});
        beginFight.fire();
	},
    update: function(component, event, helper) {
        console.log('Inside event handler');
        helper.loadPokemon(component);
    }
})