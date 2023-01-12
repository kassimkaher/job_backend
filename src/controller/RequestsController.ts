

import { PrismaClient, UserRoles } from '@prisma/client'

const prisma = new PrismaClient()

class RequestsController {


    public constructor() {

    }


    public async addRequest(req: any, response: any) {



        // attachment    String
        // status        Int
        // expect_salary Int
        // meeting_date  DateTime

        const { cover_letter, post_id, attachment, expect_salary } = req.body;

        // Validate user input

        if (!(cover_letter && post_id && attachment && expect_salary)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const chekIfRequestAgo = await prisma.requsets.findFirst({
            where: {
                post_id,
                user_id: req.user_id
            }
        })

        if (chekIfRequestAgo) {
            return response.status(402).send({ "status": false, "message": "you requested on this jop" });

        }
        try {

            const request = await prisma.requsets.create({
                data: {
                    cover_letter: cover_letter,
                    post_id,
                    user_id: req.user_id,

                    attachment,
                    status: 0,
                    expect_salary,

                }
            });




            return response.send({ "status": true, "data": request, "message": "request Added" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateRequest(req: any, response: any) {
        const id = req.params.id;
        const { cover_letter, post_id, attachment, expect_salary } = req.body;

        // Validate user input

        if (!(cover_letter && post_id && attachment && expect_salary)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldRequest = await prisma.requsets.findFirst({
            where: {
                user_id: req.user_id,
                id
            }
        })
        if (!oldRequest) {
            return response.status(401).send({ "status": false, "message": "request not found" });
        }
        try {

            const request = await prisma.requsets.update({
                where: {

                    id
                },
                data: {
                    cover_letter: cover_letter,



                    attachment,

                    expect_salary,

                }
            });


            return response.send({ "status": true, "data": request, "message": "request Updated" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updateStatusByCompany(req: any, response: any) {

        const { status,
            request_id,
            meeting_date,
            note

        } = req.body;

        // Validate user input

        if (!(status &&
            request_id &&
            meeting_date &&
            note)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const oldRequest = await prisma.requsets.findFirst({
            where: {

                id: request_id,
                post: {
                    company_id: req.company_id
                }
            }
        })
        if (!oldRequest) {
            return response.status(401).send({ "status": false, "message": req.company_id });
        }
        try {

            const request = await prisma.requsets.update({
                where: {
                    id: request_id
                },
                data: {
                    meeting_date, status

                }
            });


            return response.send({ "status": true, "data": request, "message": "request Updated" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getRequestCompany(req: any, response: any) {
        const company_id = req.company_id
        const post_id = req.params.id;


        try {
            const requests = await prisma.requsets.findMany({
                where: {
                    post_id,

                },
                include: {
                    post: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                            expereance: true,
                            jop_title: true,
                            gander: true,
                            onesignal_id: true,
                            parthday: true,
                            profile_image: true

                        }
                    }
                },
                orderBy: {
                    id: "desc"
                }
            });

            return response.send({ "status": true, requests: requests, count: requests.length });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async getRequestAdmin(req: any, response: any) {

        try {
            const requests = await prisma.requsets.findMany({
                include: {
                    post: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                            expereance: true,
                            jop_title: true,
                            gander: true,
                            onesignal_id: true,
                            parthday: true,
                            profile_image: true

                        }
                    }
                },
                orderBy: {
                    id: "desc"
                }
            });

            return response.send({ "status": true, "requests": requests, count: requests.length });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async getRequestDetailsUser(req: any, response: any) {
        const id = req.params.id;
        const user_id = req.user_id




        try {
            const requests = await prisma.requsets.findFirst({
                where: { user_id, id },
                orderBy: {
                    id: "desc"
                },
                include: {
                    post: {
                        include: {
                            company: {
                                include: {
                                    company_type: true,
                                    user: {
                                        select: {
                                            address: true,
                                            expereance: true,
                                            name: true,
                                            email: true,
                                            phone: true,
                                            jop_title: true,
                                            profile_image: true
                                        }
                                    }
                                }
                            }
                        }
                    },

                }
            });

            if (!requests) {
                return response.status(402).send({ "status": false, message: "request not found" });
            }
            return response.send({ "status": true, requests: requests });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async getRequestsUser(req: any, response: any) {

        const user_id = req.user_id




        try {
            const requests = await prisma.requsets.findMany({
                where: { user_id },
                orderBy: {
                    id: "desc"
                },
                include: {
                    post: {
                        include: {
                            company: {
                                select: {
                                    brand_name: true,
                                    description: true,
                                    history: true,


                                }
                            }
                        }
                    },

                }
            });


            return response.send({ "status": true, requests: requests, count: requests.length, user_id: user_id });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async deleteRequest(req: any, response: any) {
        const id = req.params.id;
        // Validate user input


        try {

            const oldRequest = await prisma.requsets.findFirst({
                where: {
                    user_id: req.user_id,
                    id
                }
            })
            if (!oldRequest) {
                return response.status(401).send({ "status": false, "message": "user not permition" });
            }

            await prisma.requsets.delete({
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


export default RequestsController;

function exclude(userData: any, key: string) {

    delete userData![key]

    return userData
}
