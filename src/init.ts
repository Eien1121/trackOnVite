namespace track {
    export function init(pname: string, sname: string, pid: number, cid: number) {
        projectName = pname;
        skinName = sname;
        plat_id = pid;
        channel_id = cid;

        // 获取唯一码（设备码）
        uuid = window.localStorage.getItem("uuid");
        if (!uuid) uuid = generateUUID();
        window.localStorage.setItem("uuid", uuid);
        //读取错误列表
        dataError = window.localStorage.getItem("dataError")
            ? JSON.parse(window.localStorage.getItem("dataError"))
            : [];
        sendError();

        window.addEventListener(
            "error",
            function (event: any) {
                const { message, filename, lineno, colno, error } = event;
                if (message && error) {
                    pushError({ message, filename, lineno, colno, error }, 1);
                } else {
                    const { tagName, src } = event.target as HTMLScriptElement;
                    if (tagName === "SCRIPT") {
                        pushError({ message: message || "脚本加载错误", src, error }, 1);
                    }
                }
                sendError();
            },
            true
        );
        window.onerror = function (event: any) {

        }
    }

    /**添加一个错误信息 */
    export function pushError(err: any, type = 2) {
        if (typeof err === "object") err = JSON.stringify(err);
        const error_data = {
            pn: projectName,
            sn: skinName,
            path: window.location.pathname,
            pid: plat_id,
            cid: channel_id,
            ua: navigator.userAgent,
            uuid: uuid,
            msg: err,
            type: type,
            t: new Date().getTime(),
        };
        dataError.push({ error_data: JSON.stringify(error_data) });
    }

    /**发送错误 */
    function sendError() {
        saveToStorage();
        while (dataError.length > 0) {
            const err = dataError.shift();
            if (err) {
                client_log_v1_error_store(err)
                    .then(() => saveToStorage())
                    .catch(() => dataError.push(err));
            }
        }
    }

    /**保存到本地 */
    function saveToStorage() {
        window.localStorage.setItem("dataError", JSON.stringify(dataError));
    }
}
