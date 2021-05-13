

const CURRENT_URL = 'http://localhost:3001/';

export default async (url, method = 'POST',body = {}) => {
    let internalBody = {};
    if(method === 'POST'){
        internalBody = {body:JSON.stringify(body)};
    }
    return await fetch(CURRENT_URL + url,{
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        ...internalBody})
        .then(res => res.json());
}
