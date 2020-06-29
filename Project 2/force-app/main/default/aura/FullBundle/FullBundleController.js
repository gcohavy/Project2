({
    //Method to run on initialization to set up user win/loss stat
    doInit : function(component, event, helper) {
        //Call Apex controller method
        let action = component.get('c.getWinLoss');
        action.setParams({playerId: $A.get('$SObjectType.CurrentUser.Id')});
        action.setCallback(this, (res) => {
            component.set('v.winloss', res.getReturnValue());
            console.log('Player winloss value returned: ' + res.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    //Method to run once the Battle event was fired
    battle : function(component, event, helper) {
        //Render the battle components
        component.set('v.fight', true);
        //Call Apex method to get the 3 player Pokemon that were selected
        let action1 = component.get('c.setBattlePokemon');
        action1.setParams({incoming: event.getParam('playerPokemon'),
                           userId: $A.get('$SObjectType.CurrentUser.Id')});
        action1.setCallback(this, (res) => {
            component.set('v.playerPokemon', res.getReturnValue());
            console.log('Player Pokemon value returned: ' + res.getReturnValue());
        });
        $A.enqueueAction(action1);
    },
    //Method that ends the fight and rerenders the component
    endFight : function(component, event, helper) {
        //technically rerendering will reset the 'fight' attribute to false
        //but in case of cache problems both actions were performed
        component.set('v.fight', false);
        eval("$A.get('e.force:refreshView').fire();");
    }
})