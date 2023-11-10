export interface Mercedes {
    vin_number: string,                 // cannot be null
    color: string,                      // cannot be null
    model: string,                      // cannot be null
    _year: number,                      // cannot be null
    price: number,                      // cannot be null
    transmission: string,               // cannot be null [manual, automatic]
    fuel: string,                       // cannot be null [gas, diesel, hybrid, electric]
    number_of_cylinders: number | null, // optional
    mileage: number,                    // cannot be null
    drive: string,                      // cannot be null [fwd, 4wd, rwd]
    email: string | null,               // optional
    branch_id: number,                  // cannot be null
    sales_id: number | null             // optional
}

export class Mercedes {
    
    constructor(
        vin_number: string,
         color: string,
          model: string,
           _year: number,
            price: number,
             transmission: string,
              fuel: string,
               number_of_cylinders: number | null,
                mileage: number,
                 drive: string,
                  email: string | null,
                   branch_id: number,
                    sales_id: number | null
                    ) {

        this.vin_number = vin_number;
        this.color = color;
        this.model = model;
        this._year = _year;
        this.price = price;
        this.transmission = transmission;
        this.fuel = fuel;
        this.number_of_cylinders = number_of_cylinders;
        this.mileage = mileage;
        this.drive = drive;
        this.email = email;
        this.branch_id = branch_id;
        this.sales_id = sales_id;
    }
}