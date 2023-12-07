export interface Buyer {
    cash_balance: number
    email: string,            
}                                       

export class Buyer {
    constructor(
        cash_balance: number,
        email: string
                    ) {
        this.cash_balance = cash_balance,
        this.email = email
         
}
}

