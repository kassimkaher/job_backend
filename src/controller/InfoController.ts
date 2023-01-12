

import { PrismaClient, UserRoles } from '@prisma/client'
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
import bcrypt from "bcrypt";

class InfoController {

    public constructor() {

    }


    public async addJopTitle(req: any, response: any) {

        const { title, parent_id } = req.body;

        // Validate user input

        if (!(title && parent_id!=null)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }
        const oldUser = await prisma.jopTitle.findFirst({
            where: {
                parent_id: parent_id,
                OR: [{ title }]

            },

        });
        if (oldUser) {
            return response.status(402).send({ "status": false, "message": "jop title is found" });
        }
        try {

            const jop = await prisma.jopTitle.create({
                data: {
                    title,
                    parent_id
                }
            });




            return response.send({ "status": true, "data": jop });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateJop(req: any, response: any) {

        const { title } = req.body;
        const  id  = parseInt(req.params.id);
        // Validate user input
        if (!(title )) {
            return response.status(402).send({ "status": false, "message": "All Input required" });

        }
        const oldUser = await prisma.jopTitle.findFirst({
            where: {
                id,
            },
        });

        if (!oldUser) {
            return response.status(402).send({ "status": false, "message": "jop not found" });
        }
        try {

            const jop = await prisma.jopTitle.update({
                where: {
                    id
                },
                data: {
                    title

                }
            });




            return response.send({ "status": true, "data": jop });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getJop(req: any, response: any) {
      
        const  parent_id  = parseInt(req.params.id);

       
        try {
            const jop = await prisma.jopTitle.findMany({
                where: {
                    parent_id
                },
                orderBy: {
                    id: "desc"
                  }
            });

            return response.send({ "status": true, "data": jop,"id":req.params.id });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async deleteJop(req: any, response: any) {
        const  id  = parseInt(req.params.id);
        // Validate user input
       

        try {
           await prisma.jopTitle.delete({
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


export default InfoController;