Trigger OppTrigger on Opportunity(before update){

	Set<Id> accIds = new set<Id>();
	
	for(Opportunity opp: Trigger.New){
	if(Trigger.isUpdate && opp.AccountId != null && opp.IsClosed == true){
		accIds.add(opp.AccountId);
	}
	}
	
	Map<Id, Account> accmap = new map<Id, Account>(
		[Select Id, AnnualRevenue from Account where Id IN: accIds]
	);
	
	for(Opportunity opp: Trigger.New){
		if(accmap.containsKey(opp.AccountId)){
			Account acc = accmap.get(opp.AccountId);
			acc.AnnualRevenue = (acc.AnnualRevenue == null ? 0 : acc.AnnualRevenue) + opp.Amount; 
		}
	}
	
	update accmap.values();
	
}