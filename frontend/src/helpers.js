import { apiGet } from "./api";

export function fileToDataUrl(file) {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}

export function getProjects(userId, status) {
    console.log("get prohjects function")
    console.log("info here", userId, status)
    return apiGet("/project/list", `id=${userId}&status=${status}`)
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log("caught error", error) 
            alert("Failed to get project list")
            return []
        })
}

export function getProfessionalProjectsFromStatus(userId, status) {
    return apiGet("/project/professional/get/projects/from/status", `professionalId=${userId}&status=${status}`)
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log("caught error", error) 
            alert("Failed to get project list")
            return []
        })
}