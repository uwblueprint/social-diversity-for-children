import { NextApiRequest, NextApiResponse } from "next";

// Creates status endpoint to check if server is responsive
export default (_req: NextApiRequest, res: NextApiResponse): void => {
    res.status(200).json({ status: "Healthy" });
    return;
};
