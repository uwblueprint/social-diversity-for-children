import { ssm } from "services/aws/index";

const getParams = (param: string): string => {
    ssm.getParameter(
        {
            Name: param,
        },
        (err, data) => {
            if (data?.Parameter) {
                console.log(data.Parameter);
                return data.Parameter.Value;
            }
        },
    );
};

export default getParams;
