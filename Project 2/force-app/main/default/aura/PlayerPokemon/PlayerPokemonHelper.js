({
	loadPokemon : function(cmp) {
		let action = cmp.get('c.getPlayerPokemon');
        action.setParams({ UserId: $A.get('$SObjectType.CurrentUser.Id')});
        action.setCallback(this, (res) => {
            if(res.getState() == 'SUCCESS') {
            	//console.log('Successful status')
            	cmp.set('v.Pokemon', res.getReturnValue());
        	} else {
                console.log('Could not return nothin');
            }
        });
		$A.enqueueAction(action);
	}
})