/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

function getProfile(username = 'emkayDauda'){
  axios
  .get(`https://api.github.com/users/${username}`)
  .then(response => {
    console.log(response.data)
    document.querySelector('.cards').appendChild(componentBuilder(response.data))
    axios
    .get(response.data.followers_url)
    .then(response => {
      console.log(response.data);
      const followers = response.data
      followers.forEach(follower => {
        if (username === 'emkayDauda') {
          getProfile(follower.login);
        getProfile(follower.login);        
          getProfile(follower.login);
          console.log(follower.login)
        }
      });
    })
    .catch(error => {
      console.log(error);
    })

  })
  .catch(error => {
    console.log(error)
  });
}

getProfile();
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'ladrillo',
  'bigknell'
];

followersArray.forEach(follwer => getProfile(follwer));

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/


function componentBuilder(gitHubData) {
  const [
    card,
    userImage,
    cardInfo,
    name,
    userName,
    location,
    profile,
    profileLink,
    followers,
    following,
    bio,
    expanse
  ] = ["div", "img", "div", "h3", "p", "p", "p", "a", "p", "p", "p", "div"].map(
    element => document.createElement(element)
  );

  card.classList.add('card');

  userImage.setAttribute('src', gitHubData.avatar_url);
  card.appendChild(userImage);

  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  name.classList.add('name');
  name.textContent = gitHubData.name;
  cardInfo.appendChild(name);

  userName.classList.add('username');
  userName.textContent = gitHubData.login;
  cardInfo.appendChild(userName);

  location.textContent = `Location: ${gitHubData.location}`;
  cardInfo.appendChild(location);

  profileLink.setAttribute('href', gitHubData.html_url);
  profile.textContent = 'Profile: ';
  profile.appendChild(profileLink);
  profileLink.textContent = gitHubData.html_url;
  cardInfo.appendChild(profile);

  followers.textContent = `Followers: ${gitHubData.followers}`;
  cardInfo.appendChild(followers);

  following.textContent = `Following: ${gitHubData.following}`;
  cardInfo.appendChild(following);

  bio.textContent = `Bio: ${gitHubData.bio}`;
  cardInfo.appendChild(bio);


  cardInfo.appendChild(expanse)
  expanse.classList.add("contribution")
  expanse.classList.toggle("card-open")
  expanse.style.width = "100%";
  expanse.style.marginTop = "4rem"; 

  new GitHubCalendar(".contribution", gitHubData.login);
  card.addEventListener('click', e => {
    expanse.classList.toggle("card-open")
    console.log('clicked')
  })

  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
