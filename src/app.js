import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myProfilePage } from './views/profile.js';




const root = document.querySelector("#content");
document.querySelector("#logoutBtn").addEventListener('click', onLogout);

page(decorateContext);
page('/create', createPage);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', myProfilePage);



updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {

       
        document.querySelector("#loginBtn").style.display = 'none';
        document.querySelector("#registerBtn").style.display = 'none';
        document.querySelector("#createBtn").style.display = 'inline-block';
        document.querySelector("#logoutBtn").style.display = 'inline-block';
        document.getElementById('myProfile').style.display = 'inline-block';

    } else {
        document.querySelector("#loginBtn").style.display = 'inline-block';
        document.querySelector("#registerBtn").style.display = 'inline-block';
        document.querySelector("#createBtn").style.display = 'none';
        document.querySelector("#logoutBtn").style.display = 'none';
        document.getElementById('myProfile').style.display = 'none';
    }
}
