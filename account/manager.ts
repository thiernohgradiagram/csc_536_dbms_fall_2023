export interface Manager {
    _role: number
    email: string,            
}                                       

export class Manager {
    constructor(
        _role: number,
        email: string
                    ) {
        this._role = _role,
        this.email = email
        
      
}
}

