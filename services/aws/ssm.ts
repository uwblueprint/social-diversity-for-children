import { ssm } from "services/aws/index";

const getParams = async (param: string): Promise<string> => {
    const request = await ssm
        .getParameter({
            Name: param,
        })
        .promise();

    return request.Parameter.Value;
};

export default getParams;
