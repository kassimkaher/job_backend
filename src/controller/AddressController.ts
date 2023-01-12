

import { PrismaClient, UserRoles } from '@prisma/client'

const prisma = new PrismaClient()

class AddressController {

    public constructor() {

    }


    public async addAddress(req: any, response: any) {

        const { title, discription, latitude, longitude } = req.body;

        // Validate user input

        if (!(title && latitude != null && longitude != null && discription)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }


        try {

            const address = await prisma.address.create({
                data: {
                    title,
                    discription,
                    latitude,
                    longitude,
                    user_id: req.user_id
                }
            });




            return response.send({ "status": true, "data": address, "message": "address Added" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateAddress(req: any, response: any) {

        const { id,title, discription, latitude, longitude } = req.body;

        // Validate user input
        if (!(title && latitude != null && longitude != null && discription && id)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }
        const oldAddress = await prisma.address.findFirst({
            where: {
                id,
            },
        });

        if (oldAddress==null) {
            return response.status(402).send({ "status": false, "message": "address not found" });
        }
        try {

            const address = await prisma.address.update({
                where: {
                    id
                },
                data: {
                    title,
                    latitude,
                    longitude

                }
            });




            return response.send({ "status": true, "data": address, "message": "address is update" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getAddress(req: any, response: any) {




        try {
            const addresses = await prisma.address.findMany({
             
                orderBy: {
                    id: "desc"
                }
            });

            return response.send({ "status": true, "addresses": addresses });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async deleteAddress(req: any, response: any) {
        const id = req.params.id;
        // Validate user input


        try {
            await prisma.address.delete({
                where: {
                    id
                }
            });


            return response.send({ "status": true, "message": "success delete" });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


}


export default AddressController;