import { NextApiRequest, NextApiResponse } from "next";

// Creates status endpoint to check if server is responsive
export default (_req: NextApiRequest, res: NextApiResponse): void => {
    console.log("Testing if deploy by PR works");
    res.status(200).json({ status: "Healthy" });
    return;
};
