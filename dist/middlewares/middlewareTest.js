"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewareTest = (req, res, next) => {
    console.log("masuk ges");
    next();
};
exports.default = middlewareTest;
