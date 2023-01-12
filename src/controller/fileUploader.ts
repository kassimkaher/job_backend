
import { FilesType, Prisma, PrismaClient, UserRoles } from '@prisma/client'
import filesystem from 'fs';
import path from 'path';
const prisma = new PrismaClient()
var self: FileController;
class FileController {
    static cl: FileController;
    public constructor() {
        self = this;
    }
    public async upload(req: any, res: any) {
        var type = -1;
        try {


            try {
                type = parseInt(req.params.type);
                if (type < 1 || type > 4 || !type) {
                    return res.status(404).send({ status: false, message: "page not found" });
                }

            } catch (error) {
                return res.status(404).send({ status: false, message: "page not found" });
            }


            const user = await prisma.user.findFirst({
                where: {
                    id: req.user_id
                },
                include: {

                    company: true,
                }
            })

            if (user == null) {
                return res.status(402).send({ status: false, message: "user not found" });
            }



            if (type > 2 && req.role_id == UserRoles.USER) {
                return res.status(402).send({ status: false, message: "not authurize" });
            }


            const file = req.file;
            const directory = type == 1 ? "profile" : type == 3 ? "certificate" : type == 2 ? "cv" : type == 4 ? "post" : "assets";

            if (type == 1 && user.image_id) {


                const oldFile = await prisma.files.findFirst({
                    where: {
                        id: user.image_id,

                    }

                })
                if (oldFile) {
                    filesystem.rm(process.env.PUBLICPATH + oldFile.path, function () { });
                }

            }
            if (type == 3 && user.company && user.company.image_certificate_id) {


                const oldFile = await prisma.files.findFirst({
                    where: {
                        id: user.company.image_certificate_id,

                    }
                })
                if (oldFile) {
                    filesystem.rm(process.env.PUBLICPATH + oldFile.path, function () { });
                }

            }


            const fileModel = await self.uploadFile(directory, file);
       
            if (!fileModel) {
                return res.status(500).send({
                    message: `Could not upload the file`,
                    data: req.file
                });
            }

            if (type == 1) {
                await prisma.user.update({
                    where: { id: user.id, }, data: {
                        image_id: fileModel.id
                    }
                })
            }
      
            if (type == 3 && user.company) {

                const company = await prisma.company.findFirst({
                    where: {
                        id: user.company.id
                    }
                })

                await prisma.company.update({
                    where: { id: user.company.id, }, data: {
                        image_certificate_id: fileModel.id
                    }
                })
            }

           



            return res.send({
                status: true,
                message: fileModel.path,
           
            });


        } catch (err) {
            return res.status(500).send({
                message: `Could not upload the file: ${req.file}. ${err}`,
                data: req.file
            });
        }
    }


    public async uploadFile(directory: String, file: any): Promise<any> {

        try {



            const extention = String(file.mimetype).split("/")[1]

            const path = "/" + directory + "/" + Math.floor(Date.now() / 1000) + "_" + directory + "." + extention;
            const newpath = process.env.PUBLICPATH + path;
            const data = filesystem.readFileSync(file.filepath);
            if (!data) {

                return null;
            }


            filesystem.writeFileSync(newpath, data)

            const filerecord = await prisma.files.create({
                data: {
                    path: path,
                    type: FilesType.IMAGE
                }
            })
            return filerecord

        } catch (err) {
            console.log("step================1err " + err)
            return null;
        }

    }
    async getFile(req: any, res: any) {
        const fileName = req.query.name;
        const directoryPath = process.env.PUBLICPATH;


        const user = await prisma.user.findFirst({
            where: {
                id: req.user_id
            }
        })
        if (user == null) {
            return res.status(402).send({
                status: true,
                message: "user not found",
            });

        }
        const file = await prisma.files.findFirst({
            where: {
                path: fileName,
                id: user!.image_id ?? 0
            }
        })
        if (file == null) {
            return res.status(402).send({
                status: true,
                message: "file not found",
            });

        }
        // 

        res.download(directoryPath + fileName, fileName, (err: any) => {
            if (err) {
                res.status(404).send({
                    message: "Could not download the file. " + err,
                });
            }
        });
    };

}

export default FileController
// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };

// const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };


//   upload,
//   getListFiles,
//   download,
// };
