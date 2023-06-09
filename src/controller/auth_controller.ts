

import { PrismaClient, UserRoles } from '@prisma/client'
import otpGenerator from 'otp-generator'
import jwt, { JwtPayload } from "jsonwebtoken"
const prisma = new PrismaClient()
import bcrypt from "bcrypt";

import formidable from 'formidable';

import MailController from '../controller/MailController';
const mailController = new MailController();

class AuthController {

    public constructor() {
        this.iniUser()
    }


    public async iniUser() {
        const admin = await prisma.user.findUnique({
            where: {
                phone: "9647700000000"
            }
        })
        if (admin != null) {

            return;
        }
        const sal = await bcrypt.genSalt(10)
        const hashpasswowrd = await bcrypt.hash("12345678", sal);
        const user = await prisma.user.create({
            data: {
                name: "admin",
                phone: "9647700000000",
                email: "admin@admin.com",
                password: hashpasswowrd,
                gander: "gander",
                onesignal_id: null,

                role_id: UserRoles.ADMIN,
                code: '123456',
                verified_date: new Date(),

                parthday: new Date(),




            }
        });
    }
    public async store(req: any, response: any) {

        const { name, phone, email, password, gander, jop_title_id, parthday, role_id } = req.body;

        // Validate user input
        if (!(name && phone && email && password && gander && jop_title_id && parthday && role_id)) {
            return response.status(400).send({ "status": 1, "message": "All Input required" });

        }

        if (!(role_id == "USER" || role_id == "COMPANY")) {
            return response.status(400).send({ "status": 2, "message": "account type not correct" });

        }
        const oldUser = await prisma.user.findFirst({
            where: {
                email: email
            },

        });
        if (oldUser) {
            return response.status(402).send({ "status": 3, "message": "email is register" });
        }
        try {
            const sal = await bcrypt.genSalt(10)
            const hashpasswowrd = await bcrypt.hash(password, sal);
            const newCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: true });
            const user = await prisma.user.create({
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    password: hashpasswowrd,
                    gander: gander,
                    onesignal_id: null,

                    role_id: role_id,
                    code: newCode,
                    verified_date: new Date(),
                    jop_title_id: jop_title_id,
                    parthday: new Date(req.body.parthday),
                    enable: role_id == UserRoles.COMPANY ? false : true
                }
            });

            mailController.sendCode(newCode, user.email);

            // Create token

            const token = jwt.sign(
                { id: user!.id, role_id: user!.role_id, code: newCode },
                process.env.TOKEN_KEY!,
                {
                    expiresIn: "1d",
                }
            );


            return response.send({ "status": true, "message": "pleas verfy user", token: token });
        } catch (error) {
            console.error(error)
            return response.status(400).send({ "status": 4, "message": error });
        }
    }
    public async updateUser(req: any, response: any) {

        const { name, phone, email, gander, jop_title_id, parthday, onesignal_id } = req.body;

        // Validate user input
        if (!(name && phone && email && gander && jop_title_id && parthday)) {
            return response.status(402).send({ "status": false, "message": "All Input required" });

        }

        const oldUser = await prisma.user.findFirst({
            where: {
                id: req.user_id
            },

        });
        if (!oldUser) {
            return response.status(402).send({ "status": false, "message": "account not found" });
        }
        try {
            const user = await prisma.user.update({
                where: {
                    id: req.user_id
                },
                data: {
                    name,
                    phone,
                    email: email,

                    gander: gander,
                    onesignal_id,



                    jop_title_id,
                    parthday: new Date(req.body.parthday),
                }
            });



            return response.send({ "status": true, "message": "sucess" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": req.user_id });
        }
    }

    public async verifyUser(req: any, response: any) {

        const { code } = req.body;
        const id = req.user_id;

        // Validate user input
        if (!(code && id)) {
            return response.status(400).send({ "status": 1, "message": "All Input required" });

        }
        const user = await prisma.user.findFirst({
            where: {
                id
            },
            include: {

                jop_title: true,
                 expereance:true,
                address: true,
                company: {
                    include: {
                        certificate_image: true
                    }
                },
                profile_image: true
            }

        });
        if (!user) {
            return response.status(402).send({ "status": 2, "message": "user not found " });
        }
        try {


            var dif = (new Date().getTime() - user.verified_date.getTime()) / 1000;

            if (dif > 120) {
                return response.status(403).send({ "status": false, "message": "code is expire" })
            }


            if (user.code == code) {
                const user2 = await prisma.user.update({
                    where: {
                        email: user.email
                    },
                    data: {
                        verified: true
                    }
                });
                const token = jwt.sign(
                    { id: user!.id, role_id: user!.role_id, code: code },
                    process.env.TOKEN_KEY!,
                    {
                        expiresIn: "1d",
                    }
                );
                await prisma.token.create({
                    data: {
                        user_id: user!.id,
                        code: code
                    }
                })
    
                
                return response.send({ "status": true, token: token,data:user });

              
            }
            return response.status(403).send({ "status": true, "data": "code not correct" });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async reSendCode(req: any, response: any) {


        const id = req.user_id;
        //    console.error(req)
        // Validate user input
        if (!(id)) {
            return response.status(402).send({ "status": false, "message": "All Input required" });

        }
        const user = await prisma.user.findFirst({
            where: {
                id
            },

        });
        if (!user) {
            return response.status(402).send({ "status": false, "message": "user not found " });
        }
        try {
            const newCode = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });


            const user2 = await prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    code: newCode,
                    verified_date: new Date()

                }
            });
            mailController.sendCode(newCode, user.email);


            return response.send({ "status": true, "data": "code is resent" });


        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

    public async login(req: any, response: any) {
        const session = req.session;
        const { phone, email, password } = req.body;

        // Validate user input
        if (!((phone || email) && password)) {
            return response.status(400).send({ "status": 1, "message": "All Input required" });

        }

        const user = await prisma.user.findFirst({
            where: {

                OR: [{ phone, email }]

            },
            include: {

                jop_title: true,
                expereance:true,
                address: true,
                company: {
                    include: {
                        certificate_image: true
                    }
                },
                profile_image: true
            }

        });


        const pass = user ? await bcrypt.compare(password, user?.password!) : null;

        if (user == null || !pass) {
            return response.status(400).send({ "status": 2, "message": "email or phone not register" });
        }

        try {
            const newCode = otpGenerator.generate(16, { upperCaseAlphabets: true, specialChars: true });


            // Create token
            const token = jwt.sign(
                { id: user!.id, role_id: user!.role_id, code: newCode },
                process.env.TOKEN_KEY!,
                {
                    expiresIn: "1d",
                }
            );
            await prisma.token.create({
                data: {
                    user_id: user!.id,
                    code: newCode
                }
            })

            if (!user?.verified) {
                return response.status(400).send({ "status": 3, "message": "user must veryfy", token: token });

            }
            if (user.role_id == UserRoles.USER) {

                return response.send({ "status": true, token: token, data: user });
            }
            if (user.role_id == UserRoles.COMPANY && user.enable) {

                return response.send({ "status": true, token: token });
            } else {
                return response.status(400).send({ "status": 4, "message": "please complete information", token: token });

            }


        } catch (error) {

            return response.status(402).send({ status: 5, message: session, error: error });
        }
    }

    public async profile(req: any, response: any) {
        const token = req.headers.authorization;
        if (token == null) {
            return response.status(401).json({ "status": false, "message": "token is required" });
        }

        try {
            const user1 = jwt.verify(token, process.env.TOKEN_KEY!) as JwtPayload
            const userData = await prisma.user.findFirst({

                where: {
                    id: user1.id,

                },

                include: {

                    jop_title: true,
                    // expereance:true,
                    address: true,
                    company: {
                        include: {
                            certificate_image: true
                        }
                    },
                    profile_image: true
                }

            });



            userData!.password = ""
            //  delete userData!.password!;
            const userWithoutPassword = exclude(userData, 'password')

            if (userData != null) {
                return response.send({ "status": true, "data": userWithoutPassword });

            }

            return response.status(402).send({ "status": false, "message": "user data null" });




        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }


    public async getUsers(req: any, response: any) {
        try {
            const user = await prisma.user.findMany({
                where: {
                    role_id: UserRoles.USER
                }
            });
            return response.status(200).send({ status: true, users: user, count: user.length });
        } catch (error) {
            console.error(error)
            return response.status(402).send({ "status": false, "message": error });
        }
    }

}

export default AuthController;
function exclude(userData: any, key: string) {

    delete userData![key]

    return userData
}

