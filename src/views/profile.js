import { html } from '../lib.js';
import { getMyTheaters } from '../api/data.js';
import { getUserData } from '../util.js';

const myProfileTemplate = (theaters, userData) => html`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${userData.email}</h2>
            </div>
            <div class="board">
                <!--If there are event-->
                ${theaters.length == 0 ? 
                html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
                : theaters.map(itemCard)}
            </div>
</section>`;




const itemCard = (theater) => html`
<div class="eventBoard">
   <div class="event-info">
     <img src=${theater.imageUrl}>
     <h2>${theater.title}</h2>
     <h6>${theater.date}</h6>
     <a href="/details/${theater._id}" class="details-button">Details</a>
   </div>;   
</div>`;

export async function myProfilePage(ctx) {

    const userData = getUserData();
    const theaters = await getMyTheaters(userData.id);
   
    ctx.render(myProfileTemplate(theaters, userData))
}