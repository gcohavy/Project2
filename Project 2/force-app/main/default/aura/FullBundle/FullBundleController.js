({
    battle : function(component, event, helper) {
        component.set('v.fight', true);
        let action1 = component.get('c.setBattlePokemon');
        action1.setParams({incoming: event.getParam('playerPokemon'),
                           userId: $A.get('$SObjectType.CurrentUser.Id')});
        action1.setCallback(this, (res) => {
            component.set('v.playerPokemon', res.getReturnValue());
            console.log('Player Pokemon value returned: ' + res.getReturnValue());
        });
        $A.enqueueAction(action1);
    },
    endFight : function(component, event, helper) {
        component.set('v.fight', false);
    }
})