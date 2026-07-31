import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDataService.getAccounts';


export default class PaginationComp extends LightningElement {
    @track data = [];
    @track paginatedData = [];
    @track currentPage = 1;
    @track totalPages = 0;
    @track pageSize = 5;


    columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Rating', fieldName: 'Rating', type: 'text'},
    { label: 'Industry', fieldName: 'Industry', type: 'text'},
    { label: 'Website', fieldName: 'Website', type: 'url' },
    { label: 'Account Revenue', fieldName: 'AnnualRevenue', type: 'currency'}
    ];

    @wire(getAccounts)
    wiredAccount({error, data}){
        if(data){
            this.data = data;
            this.totalPages = Math.ceil(this.data.length / this.pageSize);
            console.log('totalPages', this.totalPages);
            this.updatePagination();
        } else if(error){
            console.error('Error on fetching Account records', error);
        }
    }

    updatePagination(){
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.paginatedData = this.data.slice(startIndex, endIndex);
    }

    previousPage(){
        console.log('In Previous');
        if(this.currentPage > 1){
            this.currentPage -= 1;
            this.updatePagination();
        }
    }

    nextPage(){
        console.log('In Next Page');
        this.currentPage += 1;
        this.updatePagination();
        console.log('this.currentPage', this.currentPage);
    }

    get disablePrevious(){
        return this.currentPage === 1;
    }

    get disableNext(){
        return this.currentPage === this.totalPages;
    }

}