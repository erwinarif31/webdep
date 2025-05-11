export const createResponse = (status: string, data: any) => {
    return {
        status,
        data,
    };
};

export const constants = {
    SUCCESS_MESSAGE: "success",
    FAILED_MESSAGE: "failed",
};

