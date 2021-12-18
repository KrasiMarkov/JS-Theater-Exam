import { deleteById, getById } from '../api/data.js';
import { html } from '../lib.js'
import { getUserData } from '../util.js';


const detailsTemplate = (theater, isOwner, onDelete) => html`
<section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theater.title}</h1>
                    <div>
                        <img src=${theater.imageUrl}/>
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theater.description}</p>
                    <h4>Date: ${theater.date}</h4>
                    <h4>Author: ${theater.author}</h4>
                    <div class="buttons">

                    ${isOwner 
                       ? html`
                       <a class="btn-edit" href="/edit/${theater._id}">Edit</a>
                       <a @click=${onDelete}  class="btn-delete">Delete</a>`
                       : null}
                        
                    </div>
                    <a class="btn-like" href="#">Like</a>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
</section>`;





export async function detailsPage(ctx) {
    const theater = await getById(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && theater._ownerId == userData.id
    
    ctx.render(detailsTemplate(theater, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete your theater?');
        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }   
    
    
}