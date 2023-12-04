export interface User {
    first_name: string,                 // cannot be null
    last_name: string,                      // cannot be null
    middle_name: string | null,                      // cannot be null
    email: string,                      // cannot be null
    house_number: number,                      // cannot be null
    street_name: string,               // cannot be null [manual, automatic]
    city: string,                      // cannot be null [gas, diesel, hybrid, electric]
    state: string,                      // optional
    zip_code: number,                    // cannot be null
    password: string                     // cannot be null [fwd, 4wd, rwd]
                                       // optional
}

export class User {
    constructor(
        first_name: string,                 
        last_name: string,                     
        middle_name: string | null,                      
        email: string,                      
        house_number: number,                      
        street_name: string,               
        city: string,                       
        state: string,                      
        zip_code: number,                    
        password: string
     
                    ) {

        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.email = email;
        this.house_number = house_number;
        this.street_name = street_name;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.password = password;
    }
}

