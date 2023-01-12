

import { PrismaClient, UserRoles } from '@prisma/client'

const prisma = new PrismaClient()

class ExpereanceController {

    public constructor() {

    }


    public async addExpereance(req: any, response: any) {

        const { title, description, from, to, type } = req.body;

        // Validate user input

        if (!(title && description && from && to && type)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }


        try {

            const expereance = await prisma.expereance.create({
                data: {
                    title,
                    description,
                    from: new Date(from),
                    to: new Date(to),
                    rate: 0,
                    rate_text: "beginner",
                    user_id: req.user_id


                }
            });


            return response.send({ "status": true, "id": expereance.id, "message": "address Added" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateExpereance(req: any, response: any) {

        const { id, title, description, from, to } = req.body;

        // Validate user input
        if (!(id && title && description && from && to)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldExpereancd = await prisma.expereance.findFirst({
            where: {
                id,
            },
        });

        if (oldExpereancd == null) {
            return response.status(402).send({ "status": false, "message": "Expereancd not found" });
        }
        try {

            const expereancd = await prisma.expereance.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    from: new Date(from),
                    to: new Date(to),
                }
            });




            return response.send({ "status": true, "data": expereancd, "message": "address is update" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getExpereance(req: any, response: any) {




        try {
            const expereance = await prisma.expereance.findMany({
                where: {
                    user_id: req.user_id
                },
                orderBy: {
                    id: "desc"
                }
            });

            return response.send({ "status": true, "expereance": expereance });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async deleteExpereance(req: any, response: any) {
        const { id } = req.body;

        // Validate user input
        if (!(id)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldExpereancd = await prisma.expereance.findFirst({
            where: {
                id,
            },
        });

        if (oldExpereancd == null) {
            return response.status(402).send({ "status": false, "message": "Expereancd not found" });
        }
        try {
            await prisma.expereance.delete({
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


export default ExpereanceController;