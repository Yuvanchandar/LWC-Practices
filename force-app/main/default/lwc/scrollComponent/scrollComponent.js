import { LightningElement } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountDataService.fetchAccounts';
//import { showToast } from 'c/toastUtils';

const TABLE_COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text'},
    { label: 'Rating', fieldName: 'Rating', type: 'text'},
    { label: 'Industry', fieldName: 'Industry', type: 'text'},
    {label: 'Website', fieldName: 'Website', type: 'url', 
        typeAttributes: { tooltip: { fieldName: 'Website' } }}
];

export default class ScrollComponent extends LightningElement {
    accountList = [];
    tableColumns = TABLE_COLUMNS;
    pageSize = 50;
    offsetValue = 0;
    loadMoreStatus;
    maxRecords = 200;
    // Load initial data
    connectedCallback(){
        this.loadAccounts();
    }
    // Core method to fetch records
    loadAccounts(){
        return fetchAccounts({
            pageSize: this.pageSize,
            offsetValue: this.offsetValue
        }).then(result =>{
            this.accountList = [...this.accountList, ...result];
            this.loadMoreStatus = '';
        })
    }
    handleLoadMore(event){
        if(this.accountList > this.maxRecords){
            this.loadMoreStatus = 'No more records Limit Reached';
        }
        //start spinner
        event.target.isLoading = true;
        this.loadMoreStatus = 'Loading';
        this.offsetValue += this.pageSize;

        this.loadAccounts();
        event.target.isLoading = false;
    }
}