

import { PrismaClient, UserRoles } from '@prisma/client'
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
import bcrypt from "bcrypt";

class CompanyTypeController {

    public constructor() {

    }


    public async addCompanyType(req: any, response: any) {

        const { title, description } = req.body;

        // Validate user input

        if (!(title && description!=null)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }
        const oldUser = await prisma.companyType.findFirst({
            where: {
                title,
            

            },

        });
        if (oldUser) {
            return response.status(402).send({ "status": false, "message": "company tipe title is found" });
        }
        try {

            const jop = await prisma.companyType.create({
                data: {
                    title,
                    description
                }
            });




            return response.send({ "status": true, "data": jop });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateCompanyType(req: any, response: any) {

        const { title ,description} = req.body;
        const  id  = parseInt(req.params.id);
        // Validate user input
        if (!(title && description )) {
            return response.status(402).send({ "status": false, "message": "All Input required" });

        }
        const oldUser = await prisma.companyType.findFirst({
            where: {
                id,
            },
        });

        if (!oldUser) {
            return response.status(402).send({ "status": false, "message": "jop not found" });
        }
        try {

            const jop = await prisma.companyType.update({
                where: {
                    id
                },
                data: {
                    title,
                    description

                }
            });




            return response.send({ "status": true, "data": jop });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getCompanyType(req: any, response: any) {
      
       

       
        try {
            const jop = await prisma.companyType.findMany({
               
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

    public async deleteCompanyType(req: any, response: any) {
        const  id  = parseInt(req.params.id);
        // Validate user input
       

        try {
           await prisma.companyType.delete({
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


export default CompanyTypeController;