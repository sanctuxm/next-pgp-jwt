import { NextApiRequest, NextApiResponse } from 'next'
import GetUserFromReqCookie from '../../../utils/getUserFromReqCookie';
import makeAuthCookie from '../../../utils/makeAuthCookie';

const error = (res: NextApiResponse) => {
    let code = 401;
    res.status(code).end();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const me = GetUserFromReqCookie(req)

    if(!me) {
        error(res)
        return
    }

    const {authCookie} = makeAuthCookie(me)
    res.setHeader('Set-Cookie', authCookie)
    
    res.status(200).json(me)
}