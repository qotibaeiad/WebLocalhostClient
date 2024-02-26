//var serverurl = 'https://tailwindserverweb.onrender.com';
var serverurl = 'http://10.0.0.12:3000';

var hasFetchedArticles = false;
const articshow = []
let indexarticle;


const spin = document.getElementById('loadingSpinner');

function changeContentInMyDiv() {
  const myDiv = document.getElementById('myDiv');
  myDiv.innerHTML = 'New content for myDiv';
}



async function searchArticles() {

  var searchTerm = document.getElementById('default-search').value;
  spin.classList.remove('hidden');
  console.log(spin);
  fetch(serverurl + `/api/search?query=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      spin.classList.add('hidden');
     const articlesContainer = document.getElementById('gridid');
    //  <div id="loadingSpinner" class="flex items-center justify-center h-screen fixed top-0 left-0 w-full bg-gray-800 bg-opacity-75 z-50 hidden">
    //  <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    //  </div>
    articlesContainer.innerHTML = ``;
    
      // Check if articles exist
      if (data.articles && data.articles.length > 0) {
        checkfavorite = new Array(data.articles.length); // Creates an array with length 5, all elements are initially undefined
        // Loop through articles and create HTML elements
        data.articles.forEach((article, i) => {
          if (article.title && article.description && article.urlToImage) {
            
          const articleElement = document.createElement('div');
          articleElement.innerHTML = `
          <div class="hover:scale-90  flex flex-wrap transform shadow-lg transition-transform duration-300 ease-in-out text-black dark:text-wight mt-16 mb-16 p-6">
            <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
              <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                <img src="${article.urlToImage}" onclick="" class="lg:w-full" alt="Louvre" />
              </div>
            </div>
                          
              <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                <h5 class="mb-3 text-lg font-bold text-black dark:text-white" onclick="" >${article.title}</h5>
                <div class="mb-3 flex items-center justify-center text-sm font-medium text-black dark:text-white md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-2 h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                  News
                </div>
                <p class="mb-6 text-black dark:text-white">
                  <small>Published <u>${article.publishedAt}</u></small>
                </p>
                <p class="text-black dark:text-white">
                  ${article.description}
                </p>
                <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite(${i})">
  <div id="staricon${i}" class="star-icon"></div>
</a>
              </div>
            </div>
          `;

      //    <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite('${getLoggedInUser()}','${article.title}','${article.author}','${article.category}','${article.url}',${i})">

          
          articlesContainer.appendChild(articleElement);
          updateStarIcon(i); // Update star icon initially
          spin.classList.add('hidden');

        }
        });
      } else {
        const articlesContainer = document.getElementById('gridid');

        // Handle case when no articles are available
        articlesContainer.innerHTML = '<p>No articles available</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      const articlesContainer = document.getElementById('gridid');
      articlesContainer.innerHTML = '<p>Error fetching articles</p>';
    });
}

document.getElementById('searchbutton').addEventListener('click',searchArticles);


async function checkUser(username, password) {
  const apiUrl = serverurl+`/api/login?username=${username}&password=${password}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {

      localStorage.setItem('loggedInUser', username);
      console.log('success');
      return true;
      // Perform actions after successful authentication (e.g., redirect, display content)
      return true;
    } else {
      console.log('not success');
      return false;
      // Authentication failed
      // Handle authentication failure (e.g., display an error message)
    }
  } catch (error) {
    console.error('Error during login request:', error);
    // Handle other errors (e.g., network issues)
    return false;
  }
}

function getSelectedValue() {
  // Get the dropdown button element
  var dropdownButton = document.getElementById("hs-dropdown-hover-event");

  // Get the currently selected value
  var selectedValue = dropdownButton.textContent.trim();

  // Log or return the selected value
  console.log("Selected Value: ", selectedValue);
  // return selectedValue; // uncomment this line if you want to return the value from the function
}


//add article
//function toggleFavorite(username,title, content, author, category, url,i) {
  function toggleFavorite(i) {
  checkfavorite[i] = !checkfavorite[i];
  updateStarIcon(i);
  // if(checkfavorite[i]){
  //   handleArticleAddition(username,title, content, author, category, url);
  // }
  
}


function updateStarIcon(i) {
  // Get the star icon element
  var starIcon = document.getElementById(`staricon${i}`);

  // Update the SVG content based on the checkfavorite value
  if (checkfavorite[i]) {
    starIcon.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="absolute bottom-4 right-4 h-6 w-6 text-blue-500 dark:text-white star-icon">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="blue"></path>
      </svg>
    `;
  } else {
    starIcon.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="absolute bottom-4 right-4 h-6 w-6 text-blue-500 dark:text-white star-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2l2.308 7.426h7.383l-5.955 4.573L16.693 22 12 17.456 7.307 22l1.266-7.001L2 9.426h7.383L12 2z" />
      </svg>
    `;
  }
}

// function fetchAndDisplayArticles(category) {
//   document.getElementById('loadingSpinner').classList.remove('hidden');
//   fetch(serverurl+`/api/data?category=${category}`)
//     .then(response => response.json())
//     .then(data => {
//       document.getElementById('loadingSpinner').classList.add('hidden');
//       const articlesContainer = document.getElementById('gridid');

//       // Clear existing content in the container
//       articlesContainer.innerHTML = '';
//       // Check if articles exist
//       if (data.articles && data.articles.length > 0) {
//         checkfavorite = new Array(data.articles.length); // Creates an array with length 5, all elements are initially undefined
//         data.articles.forEach((article, i) => {
//           if (article.title && article.description && article.urlToImage) {
//             articshow.push(article);
//             var index = i;
//           const articleElement = document.createElement('div');
//           articleElement.innerHTML = `
//           <div class="hover:scale-90 mb-6 flex flex-wrap transform shadow-lg transition-transform duration-300 ease-in-out text-black dark:text-wight mt-16 mb-16 p-6">
//             <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
//               <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
//                 <img src="${article.urlToImage}" onclick="openarticl(${index})" class="lg:w-full" alt="Louvre" />
//               </div>
//             </div>
                          
//               <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
//                 <h5 class="mb-3 text-lg font-bold text-black dark:text-white" onclick="" >${article.title}</h5>
//                 <div class="mb-3 flex items-center justify-center text-sm font-medium text-black dark:text-white md:justify-start">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-2 h-5 w-5">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
//                   </svg>
//                   News
//                 </div>
//                 <p class="mb-6 text-black dark:text-white">
//                   <small>Published <u>${article.publishedAt}</u></small>
//                 </p>
//                 <p class="text-black dark:text-white">
//                   ${article.description}
//                 </p>
//                 <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite(${i})">
//                   <div id="staricon${i}" class="star-icon"></div>
//                 </a>
//               </div>
//             </div>
//           `;
          
//           articlesContainer.appendChild(articleElement);
//           updateStarIcon(i); // Update star icon initially
//         }
//         });
//       } else {
//         const articlesContainer = document.getElementById('gridid');

//         // Handle case when no articles are available
//         articlesContainer.innerHTML = '<p>No articles available</p>';
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       const articlesContainer = document.getElementById('gridid');
//       articlesContainer.innerHTML = '<p>Error fetching articles</p>';
//     });
// }


function fetchAndDisplayArticles(category) {
  document.getElementById('loadingSpinner').classList.remove('hidden');

  // Check if articles are present in local storage
  const storedArticles = localStorage.getItem('articles');
  if (storedArticles) {
    // If articles are present in local storage, parse and display them
    displayArticles(JSON.parse(storedArticles));
    document.getElementById('loadingSpinner').classList.add('hidden');
  } else {
    // If articles are not present in local storage, make a fetch request
    fetch(serverurl + `/api/data?category=${category}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('loadingSpinner').classList.add('hidden');

        const articlesContainer = document.getElementById('gridid');

        // Clear existing content in the container
        articlesContainer.innerHTML = '';

        // Check if articles exist
        if (data.articles && data.articles.length > 0) {
          // Save articles to local storage
          localStorage.setItem('articles', JSON.stringify(data.articles));

          // Display articles
          displayArticles(data.articles);
        } else {
          // Handle case when no articles are available
          articlesContainer.innerHTML = '<p>No articles available</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        const articlesContainer = document.getElementById('gridid');
        articlesContainer.innerHTML = '<p>Error fetching articles</p>';
      });
  }
}


function displayArticles(articles) {
  const articlesContainer = document.getElementById('gridid');

  // Check if articles exist
  if (articles && articles.length > 0) {
    checkfavorite = new Array(articles.length); // Creates an array with length 5, all elements are initially undefined

    articles.forEach((article, i) => {
      if (article.title && article.description && article.urlToImage) {
        articshow.push(article);
        var index = i;
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
        <div class="hover:scale-90 mb-6 flex flex-wrap transform shadow-lg transition-transform duration-300 ease-in-out text-black dark:text-wight mt-16 p-6">
          <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
            <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
              <img src="${article.urlToImage}" onclick="openarticl(${index})" class="lg:w-full" alt="Louvre" />
            </div>
          </div>
                        
            <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
              <h5 class="mb-3 text-lg font-bold text-black dark:text-white" onclick="" >${article.title}</h5>
              <div class="mb-3 flex items-center justify-center text-sm font-medium text-black dark:text-white md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-2 h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
                News
              </div>
              <p class="mb-6 text-black dark:text-white">
                <small>Published <u>${article.publishedAt}</u></small>
              </p>
              <p class="text-black dark:text-white">
                ${article.description}
              </p>
              <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite(${i})">
             <div id="staricon${i}" class="star-icon"></div>
              </a>
            </div>
          </div>
        `;
        //              <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite('${getLoggedInUser()}','${article.title}','${article.author}','${article.category}','${article.url}',${i})">


        articlesContainer.appendChild(articleElement);
        updateStarIcon(i); // Update star icon initially
      }
    });
  } else {
    // Handle case when no articles are available
    articlesContainer.innerHTML = '<p>No articles available</p>';
  }
}




async function checkUser(username, password) {
  const apiUrl = serverurl + `/api/login?username=${username}&password=${password}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('loggedInUser', username); // Save the logged-in user's username
      console.log('success');
      return true;
    } else {
      console.log('not success');
      return false;
    }
  } catch (error) {
    console.error('Error during login request:', error);
    return false;
  }
}


async function checkLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username == '' || password == '') {
    alert('Enter username and password');
    return;
  }

  try {
    const isAuthenticated = await checkUser(username, password);
    if (isAuthenticated) {
      localStorage.setItem('name',username)
      loadPage('home');
      
    } else {
      alert('Incorrect username or password');
    }
  } catch (error) {
    //console.error('Error during login:', error);
    //alert('An error occurred during login');
  }
}



//user ragister
// Function to add a new user
// Modify the addUser function in the client code
async function addUser(username, password, email, phone, category) {
  const apiUrl = serverurl + `/api/register`;

  const userData = {
    username,
    password,
    email,
    phone,
    category,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('register success');
      return true;
    } else {
      console.log('register not success');
      return false;
    }
  } catch (error) {
    console.error('Error during registration request:', error);
    return false;
  }
}

async function handleUserRegistration(username, password, email, phone, category) {
  try {
    const isUserAdded = await addUser(username, password, email, phone, category);
    if (isUserAdded) {
      alert('User registered successfully');
      // Additional actions after successful registration (e.g., redirect)
    } else {
      alert('User registration failed');
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    alert('An error occurred during user registration');
  }
}

function openInterestModal() {
  document.getElementById('interestModal').classList.remove('hidden');
}



function toggleCategory(containerId) {
  const categoryContainer = document.getElementById(containerId);
  categoryContainer.classList.toggle('selected-category');
}

function getSelectedCategories() {
  const selectedCategories = [];

  // Get all elements with the class 'selected-category'
  const selectedCategoryElements = document.querySelectorAll('.selected-category');

  // Iterate through the selected elements and extract category names
  selectedCategoryElements.forEach((element) => {
      const categoryName = element.querySelector('.text-white').innerText;
      selectedCategories.push(categoryName);
  });

  return selectedCategories;
}

function validateForm() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var country = document.getElementById('country').value;
  const selectedCategories = getSelectedCategories();
  console.log(selectedCategories)
  if (username === '' || email === '' || phone === '' || password === '' || confirmPassword === '' === '' || confirmPassword === '' || country === ''|| selectedCategories=='') {
      alert('Please fill in all fields.');
  } else {
      if(password != confirmPassword ){
          alert('The password does not match');
      }
      else{
        localStorage.setItem('name',username)
        handleUserRegistration(username,password,email,phone,selectedCategories);
        //openInterestModal()
          }
}}

function closeInterestModal() {
  document.getElementById('interestModal').classList.add('hidden');
  validateForm()
  window.location.href = 'home.html';            
}


async function addArticle(username,title, content, author, category, url) {
  const apiUrl = serverUrl + '/api/add-article';

  const articleData = {
    username,
    title,
    content,
    author,
    category,
    url,
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers like authentication tokens if required
      },
      body: JSON.stringify(articleData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Article added successfully');
      return true;
    } else {
      console.log('Failed to add article');
      return false;
    }
  } catch (error) {
    console.error('Error during article addition request:', error);
    return false;
  }
}

async function handleArticleAddition(username,title, content, author, category, url) {
  try {
    const isArticleAdded = await addArticle(username,title, content, author, category, url);
    if (isArticleAdded) {
      alert('Article added successfully');
      // Additional actions after successful article addition
    } else {
      alert('Failed to add article');
    }
  } catch (error) {
    console.error('Error during article addition:', error);
    alert('An error occurred during article addition');
  }
}


function openarticl(index) {
  indexarticle = index;
  // Save the articshow array to localStorage
  localStorage.setItem('articshow', JSON.stringify(articshow));
  // Navigate to the new.html page
  window.location.href = 'new1.html?index=' + index;
}


function checkLoggedInUser() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
    // User is logged in, perform necessary actions
    console.log('Logged in user:', loggedInUser);
    // You can use the loggedInUser variable throughout your code
  } else {
    // User is not logged in
    console.log('No user is logged in');
  }
}

// Call the function when the page loads

function getLoggedInUser() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  return loggedInUser ? loggedInUser : null;
}

// Call the function when the page loads
const loggedInUser = getLoggedInUser();

// Now you can use `loggedInUser` throughout your code
if (loggedInUser) {
  console.log('User is logged in:', loggedInUser);
} else {
  console.log('No user is logged in');
}

checkLoggedInUser();




fetchAndDisplayArticles('general');