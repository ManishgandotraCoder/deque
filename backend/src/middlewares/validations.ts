import { Validator } from "node-input-validator";
import { Response, Request, NextFunction } from "express";

/**
 * Middleware validation class
 */

export class validations {
  async validateGetBooksParams(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let ruleObj = {
      p: "required|minLength:1|maxLength:40",
    };

    const v = new Validator(req.query, ruleObj);
    v.check().then((matched: any) => {
      var allErr: string = "";
      if (!matched) {
        for (let er in v.errors) {
          allErr = v.errors[er]["message"];
        }
        return res.status(400).send({ message: allErr });
      } else {
        next();
      }
    });
  }
}
