

import express from 'express';
import AddressController from '../controller/AddressController';
import AuthController from '../controller/auth_controller';
import CompanyController from '../controller/CompanyController';
import CompanyTypeController from '../controller/CompanyTypeController';
import ExpereanceController from '../controller/ExpereanceController';
import FileController from '../controller/fileUploader';
import InfoController from '../controller/InfoController';
import PostesController from '../controller/PostesController';
import RequestsController from '../controller/RequestsController';
import { checkAuth , isVerify,isAdmin, isCompany,logout, isUser} from '../middleware/AuthMiddleware';
import { isFile} from '../middleware/FileMiddleware';

//import auth from '../controller/auth_controller';

const router = express();
const auth = new AuthController();
const infoController = new InfoController();
const addressController = new AddressController();
const expereanceController = new ExpereanceController();
const fileController = new FileController();
const companyController = new CompanyController();
const companyTypeController = new CompanyTypeController();
const postController = new PostesController();
const requestsController = new RequestsController();




router.route("/auth")
.get(checkAuth,isVerify,auth.profile)
.post(auth.store)
.put(checkAuth,isVerify,auth.updateUser);

// logout 
router.get("/logout",checkAuth,logout)


router.post("/verfyuser",checkAuth,auth.verifyUser);
router.get("/sentCode",checkAuth,auth.reSendCode);


// route for jop title

router
.get("/joptitle/:id",checkAuth,infoController.getJop);
router
.get("/joptitle",infoController.getJops);
router.post("/joptitle",checkAuth,isAdmin,infoController.addJopTitle);
router.delete("/joptitle/:id",checkAuth,isAdmin,infoController.deleteJop);
router.put("/joptitle/:id",checkAuth,isAdmin,infoController.updateJop);


// route for Company type

router
.get("/companyType",checkAuth,companyTypeController.getCompanyType);
router.post("/companyType",checkAuth,isAdmin,companyTypeController.addCompanyType);
router.delete("/companyType/:id",checkAuth,isAdmin,companyTypeController.deleteCompanyType);
router.put("/companyType",checkAuth,isAdmin,companyTypeController.updateCompanyType);




// route for addresss
router
.get("/address",checkAuth,isAdmin,addressController.getAddress);
router.post("/address",checkAuth,isVerify,addressController.addAddress);
router.delete("/address",checkAuth,isVerify,addressController.deleteAddress);
router.put("/address",checkAuth,isVerify,addressController.updateAddress);

// rout for expereance

router
.get("/experence",checkAuth,expereanceController.getExpereance);
router.post("/experence",checkAuth,isVerify,expereanceController.addExpereance);
router.delete("/experence",checkAuth,expereanceController.deleteExpereance);
router.put("/experence",checkAuth,expereanceController.updateExpereance);


router.post("/company",checkAuth,isVerify,isCompany,companyController.addCompany);
router.delete("/company",checkAuth,isAdmin,companyController.deleteCompany);
router.put("/company",checkAuth,isCompany,companyController.updateCompany);

router
.put("/company/:id",checkAuth,isAdmin,companyController.activeCompany);



router
.post("/login",auth.login);
router
.post("/profile",checkAuth,auth.profile);
router.post("/upload/:type",checkAuth,isVerify,isFile, fileController.upload);
router.get("/download/profile",checkAuth,isVerify, fileController.getFile);

// route for post 

router
.get("/post/:jop_title_id",checkAuth,postController.getPostsUser);
router
.get("/mypost",checkAuth,isCompany,postController.getPosts);
router
.get("/postes",checkAuth,isAdmin,postController.getPostsAdmin);

router.post("/post",checkAuth,isCompany,postController.addPost);
router.delete("/post/:id",checkAuth,isCompany,postController.deletePost);
router.put("/post",checkAuth,isCompany,postController.updatePost);
router.patch("/post/:id",checkAuth,isCompany,postController.closePost);

// route for post 

router
.get("/request/:id",checkAuth,requestsController.getRequestDetailsUser);
router
.get("/companyrequest/:id",checkAuth,isCompany,requestsController.getRequestCompany);
router
.get("/requests",checkAuth,isAdmin,requestsController.getRequestAdmin);
router
.get("/userrequests",checkAuth,isUser,requestsController.getRequestsUser);
router
.put("/request",checkAuth,isCompany,requestsController.updateStatusByCompany);
router
.put("/userhandover",checkAuth,isCompany,requestsController.updateUserWorkByCompany);

router.post("/request",checkAuth,isUser,requestsController.addRequest);
router.delete("/request/:id",checkAuth,isUser,requestsController.deleteRequest);




// admin api
router.get("/adminUser",checkAuth,isAdmin,auth.getUsers)
router
.get("/company",checkAuth,isAdmin,companyController.getCompany);

export default router;


