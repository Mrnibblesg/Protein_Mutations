import express from "express"
import Protein from "../models/protein.js"

const router = express.Router()

router.get("/protein-names",(req,res) => {
    Protein.find({},"name").then((proteins) => {
        res.status(200).send(proteins)
    }).catch((error) => {
        console.error(error)
        res.status(500).send("Could not retrieve protein names!")
    })
}) 

export default router