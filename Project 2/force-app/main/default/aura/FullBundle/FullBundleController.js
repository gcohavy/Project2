({
	fight : function(component, event, helper) {
        
		component.set('v.fight', true);
	},
    endFight : function(component, event, helper) {
        component.set('v.fight', false);
    }
})