import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req:Request, res:Response) => {
    
    const query = `
        SELECT *
        FROM heroes;
    `;

    MySQL.ejecutarQuery(query, ( err:any, heroes:Object[], filas:any ) => {

        if( err )
        {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else
        {
            res.status(400).json({
                ok: true,
                heroes
            }); 
        }
    });
});


router.get('/heroes/:id', (req:Request, res:Response) => {
    
    const id = req.params.id;
    
    const query = `
        SELECT *
        FROM heroes
        WHERE id = ${MySQL.escapeValues(id)};
    `;

    MySQL.ejecutarQuery(query, ( err:any, heroe:Object[], filas:any ) => {

        if( err )
        {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else
        {
            res.status(400).json({
                ok: true,
                heroe
            }); 
        }
    });
});

export default router;