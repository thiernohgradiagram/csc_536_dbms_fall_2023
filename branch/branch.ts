export interface Branch {
    branch_name: string,                 // cannot be null
    branch_number: number,                      // cannot be null
    street_name: string,                      // cannot be null
    city: string,                      // cannot be null
    state: string,  
    zip_code: number, 
    branch_id : number|null,                   // cannot be null
    email :string|null            // cannot be null [manual, automatic]
                   // optional
}

export class Branch {
    constructor(
        branch_name: string,                 
        branch_number: number,                      
        street_name: string,                      
        city: string,                      
        state: string,  
        zip_code: number,   
        branch_id : number | null,                
        email :string|null 
     
                    ) {

        this.branch_name = branch_name;
        this.branch_number = branch_number;
        this.street_name = street_name;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.email = email;
        this.branch_id = null;
    }
}

// {
//     "vin_number": "benz-000-000-047 ",
//     "color": "green",
//     "model": "GLA 250 4MATIC SUV",
//     "_year": 2023,
//     "price": 96778.99,
//     "transmission": "automatic",
//     "fuel": "gas",
//     "number_of_cylinders": 4,
//     "mileage": 1111,
//     "drive": "fwd",
//     "email": null,
//     "branch_id": 4,
//     "sales_id": null
// }