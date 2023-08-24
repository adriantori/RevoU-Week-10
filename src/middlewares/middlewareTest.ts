import { Request, Response, NextFunction} from "express"

const middlewareTest = (req: Request, res:Response, next:NextFunction) => {
    console.log("masuk ges");
    next();
}

export default middlewareTest;