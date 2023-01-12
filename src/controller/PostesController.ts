

import { PrismaClient, UserRoles } from '@prisma/client'

const prisma = new PrismaClient()

class PostesController {


    public constructor() {

    }


    public async addPost(req: any, response: any) {



        const { title, description, salary, number_of_person, work_location, work_time, expire, week_end, day_hour, person_level, jop_title_id } = req.body;

        // Validate user input

        if (!(title && description && salary && number_of_person && work_location && work_time && expire && week_end && day_hour && person_level && jop_title_id)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }


        try {

            const post = await prisma.posts.create({
                data: {
                    title,
                    description,
                    salary,
                    number_of_person,
                    work_location,
                    work_time,
                    expire,
                    week_end,
                    day_hour,
                    person_level,
                    company_id: req.company_id,
                    jop_title_id
                }
            });




            return response.send({ "status": true, "data": post, "message": "post Added" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async updatePost(req: any, response: any) {
        const company_id = req.company_id;

        const { id, title, description, salary, number_of_person,jop_title_id, work_location, work_time, week_end, day_hour, person_level } = req.body;

        // Validate user input

        if (!(id && title && description && salary && number_of_person && work_location && work_time  && week_end && day_hour && person_level&&jop_title_id)) {
            return response.status(402).send({ "status": false, "message": "field required" });

        }

        const companypost = await prisma.posts.findFirst({
            where: {
                company_id,
                id
            }
        })
        if (!companypost) {
            return response.status(401).send({ "status": false, "message": "not  authrize" ,id:company_id});
        }
        try {

            const post = await prisma.posts.update({
                where: { id },
                data: {
                    title,
                    description,
                    salary,
                    number_of_person,
                    work_location,
                    work_time,
                   
                    week_end,
                    day_hour,
                    person_level,
                    jop_title_id

                }
            });




            return response.send({ "status": true, "data": post, "message": "post Updated",kko:companypost });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getPosts(req: any, response: any) {
        const company_id = req.company_id



        try {
            const posts = await prisma.posts.findMany({
                where: { company_id },
                orderBy: {
                    id: "desc"
                },
                include:{
                    request:{
                        include:{
                            user:{
                                select:{
                                    name:true,
                                    email:true,
                                    phone:true,
                                    address:true,
                                    expereance:true,
                                    jop_title:true,
                                    gander:true,
                                    onesignal_id:true,
                                    parthday:true,
                                    profile_image:true
                                    
                                }
                            }
                        }
                    }
                }
            });

            return response.send({ "status": true, "posts": posts, count: posts.length });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async getPostsAdmin(req: any, response: any) {

        try {
            const posts = await prisma.posts.findMany({

                orderBy: {
                    id: "desc"
                },include:{
                    request:{
                        include:{
                            user:{
                                select:{
                                    name:true,
                                    email:true,
                                    phone:true,
                                    address:true,
                                    expereance:true,
                                    jop_title:true,
                                    gander:true,
                                    onesignal_id:true,
                                    parthday:true,
                                    profile_image:true
                                    
                                }
                            }
                        }
                    }
                }
            });

            return response.send({ "status": true, "posts": posts, count: posts.length });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async getPostsUser(req: any, response: any) {
        const jop_title_id = parseInt(req.params.jop_title_id)
    



        try {
            const posts = await prisma.posts.findMany({
                where: { jop_title_id ,is_open:true},
                orderBy: {
                    id: "desc"
                },
                include:{
                    company:{
                        include:{
                            user:{
                                select:{
                                    name:true,
                                    email:true,
                                    phone:true,
                                    expereance:true,
                                    address:true
                                },
                              
                            }
                        }
                    }
                }
            });
            const postsWithoutPassword = exclude(posts, 'password')

            return response.send({ "status": true, posts: postsWithoutPassword,count:posts.length });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }
    public async deletePost(req: any, response: any) {
        const id = req.params.id;
        // Validate user input


        try {
            await prisma.posts.delete({
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
    public async closePost(req: any, response: any) {
        const id = req.params.id;
        // Validate user input


        try {
            await prisma.posts.update({
                where: {
                    id
                },
                data: {
                    is_open: false
                }
            });


            return response.send({ "status": true, "message": "success closed" });

        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }



}


export default PostesController;

function exclude(userData: any, key: string) {

    delete userData![key]

    return userData
}
