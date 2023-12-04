export interface Mercedes_images {
    image_path: string,
    vin_number: string,            
}                                       

export class Mercedes_images {
    constructor(
        image_path: string,
        vin_number: string
                    ) {
        this.image_path = image_path,
        this.vin_number = vin_number
             
}
}

