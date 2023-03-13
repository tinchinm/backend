import { Router, Request, Response } from "npm:express"

const rutaPrincipal = Router();

// deno-lint-ignore no-unused-vars
rutaPrincipal.get('/', (req:Request, res:Response) => {
    res.send('Hello World from DENO')
})



export default rutaPrincipal;