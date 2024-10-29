namespace track {
    export async function client_log_v1_error_store(data: any) {
        fetch(`${host}/client_log/v1/error/store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        });
    }
}
