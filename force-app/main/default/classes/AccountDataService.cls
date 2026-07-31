public with sharing class AccountDataService {
    @AuraEnabled(cacheable = true)
    public static List<Account> fetchAccounts(Integer pageSize, Integer offsetValue){
        try {
           List<Account> accountList = [Select Id, Name, Rating, Industry, Website from Account ORDER BY CreatedDate LIMIT :pageSize OFFSET :offsetValue];
           return accountList;
        } catch (Exception e) {
            throw new AuraHandledException('Error fecthing accounts...'+e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Rating, Industry, Website, AnnualRevenue FROM Account Limit 250];
    }
}