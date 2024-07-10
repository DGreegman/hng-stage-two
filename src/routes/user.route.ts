import express, {Router} from 'express'
import user_constroller from '../controllers/user.controller'


const user_route: Router = express.Router()

user_route.route('/register').post(user_constroller.register)
user_route.route('/login').post(user_constroller.login)

export default user_route