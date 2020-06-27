({
	doInit : function(component, event, helper) {
        //console.log('Initialization begun');
		helper.loadPokemon(component);
		//console.log('Initialization complete');
	},
    update: function(component, event, helper) {
        console.log('Inside event handler');
        helper.loadPokemon(component);
    }
})