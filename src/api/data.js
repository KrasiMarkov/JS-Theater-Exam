import * as api from './api.js';
import { getUserData } from '../util.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;
// up to here not project specific

// project specific funcs:

//getAll
export async function getAll() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

//create(item)
export async function create(item) {
    return api.post('/data/theaters', item);
}

//getById(id)
export async function getById(id) {
    return api.get('/data/theaters/' + id);
}
//deleteById(id)
export async function deleteById(id) {
    return api.del('/data/theaters/' + id);
}

//edit(id, item)
export async function edit(id, item) {
    return api.put('/data/theaters/' + id, item);
}

export async function getMyTheaters(userId){
    
    return  await api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    
}

//getByYear(query) - project specific
export async function getByName(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
};
