export function findInObjArr(arr, arrVal, findKey) {
    let result = arr.find((o, i) => {
        if (o[findKey] === arrVal) {
            return arr[i]; // stop searching
        }
    });
    return result;
}

export function getSPOCName(arr, arrVal, findKey) {

    if (arrVal) {
        let result = arr.map((o, i) => {
            if (o[findKey] === arrVal) {
                console.log(arr[i].title);
                return arr[i].title; // stop searching
            }
        });
        return result;
    }
    else {
        return "";
    }

}

export function prepareFeatures(featuresData, themeId, isRecom = false, searchStr = "") {
    let themeFeatures = featuresData.filter(function (el) {
        if (isRecom) {
            return el.platform_template_id == themeId && el.is_recommended == "TRUE";
        }
        else {
            return el.platform_template_id == themeId;
        }

    });

    if (searchStr) {
        themeFeatures = featuresData.filter(function (el) {
            return el.feature_name.toLowerCase().search(searchStr.toLocaleLowerCase()) >= 0;
        });
    }

    const unique = (themeFeatures.length > 0) ? [...new Set(themeFeatures.map(item => item.grouping))] : [];
    if (unique.length > 0) {
        let result = [];
        unique.forEach((item) => {
            result[item] = [];
            themeFeatures.forEach((inneritem) => {
                if (inneritem.grouping === item) {
                    result[item].push(inneritem)
                }
            })
        });
        return result;
        console.log(result);
    }
    else {
        return [];
    }
}

export function renderStatusName(status) {
    let statusName = "";
    switch (status) {
        case "PAYMENT_PENDING":
            statusName = "Payment Pending";
            break;
        case "DEPLOYMENT_PENDING":
            statusName = "Deployment Pending";
            break;
        case "DEPLOYMENT_INPROGRESS":
            statusName = "In Progress";
            break;
        case "DEPLOYED":
            statusName = "Deployed";
            break;
        case "HOLD":
            statusName = "Hold";
            break;
        default:
            statusName = "Payment Pending";
    }
    return statusName;
}
export function renderStatusClass(status) {
    let statusClass = "";
    switch (status) {
        case "PAYMENT_PENDING":
            statusClass = "pending";
            break;
        case "DEPLOYMENT_PENDING":
            statusClass = "deployed";
            break;
        case "DEPLOYMENT_INPROGRESS":
            statusClass = "inprogress";
            break;
        case "DEPLOYED":
            statusClass = "deploy";
            break;
        case "HOLD":
            statusClass = "deployed";
            break;
        default:
            statusClass = "pending";
    }
    return statusClass;
}