

import { PrismaClient, UserRoles } from '@prisma/client'

const prisma = new PrismaClient()

class CompanyController {

    public constructor() {

    }


    public async addCompany(req: any, response: any) {

        const { brand_name, description, company_type_id, history } = req.body;

        // Validate user input

        if (!(brand_name && description && company_type_id && history )) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldUser = await prisma.company.findFirst({
            where: {
                user_id:req.user_id,
            

            },

        });
        if (oldUser) {
            return response.status(402).send({ "status": false, "message": "you have company" });
        }
        try {

            const company = await prisma.company.create({
                data: {
                    brand_name,
                    description,
                    user_id:req.user_id,
                    company_type_id,
                    history
                   
                }
            });


            return response.send({ "status": true, "id": company.id, "message": "company Added" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateCompany(req: any, response: any) {

        const {id, brand_name, description, company_type_id, history } = req.body;

        // Validate user input

        if (!(id && brand_name && description && company_type_id && history )) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldCompany= await prisma.company.findFirst({
            where: {
                id,
            },
        });

        if (oldCompany== null) {
            return response.status(402).send({ "status": false, "message": "Company not found" });
        }
        try {

            const company= await prisma.company.update({
                where: {
                    id
                },
                data: {
                    brand_name,
                    description,
                history
                }
            });




            return response.send({ "status": true, "data": company, "message": "company is update" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getCompany(req: any, response: any) {

  try {
            const companies = await prisma.company.findMany({
               
                orderBy: {
                    id: "desc"
                }
            });

            return response.send({ "status": true, "companies": companies });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async  activeCompany(req: any, response: any){
        const  id  = req.params.id;
        const { status} = req.body;
        try {
        const company = await prisma.company.findFirst({
            where: {
                id:id,
            

            },

        });
        if (!company) {
            return response.status(402).send({ "status": false, "message": "data not found" });
        }
 
        const user = await prisma.user.update({
            where: {
                id: company.user_id
            },
            data: {
                enable:status
            }
        });
        return response.status(200).send({ "status": true, "message": "Sucess" });
       
       } catch (error) {
        return response.status(402).send({ status: false, message: "error",error:error });
       
       }

    }
    public async deleteCompany(req: any, response: any) {
        const { id } = req.body;

        // Validate user input
        if (!(id)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldCompany= await prisma.expereance.findFirst({
            where: {
                id,
            },
        });

        if (oldCompany== null) {
            return response.status(402).send({ "status": false, "message": "Companynot found" });
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


export default CompanyController;