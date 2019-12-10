// Simarpreet Singh (200413865)

//Username and password that will be used to login to see the deals
var Users =[{username: "DoodlyDoodler",password: "dddd"}]

// method returns the element that has the ID attribute
function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

// loop to check if the password entered is correct
	for(var i = 0; i < Users.length; i++)
	 {
		if(username == Users[i].username && password == Users[i].password)
		 {
			alert("You are logged in")
			window.location.href = "index.html";
			return ;
		}
	}
	alert("Username or Password is incorrect") // if the details entered are wrong then this error message will be displayed
}

// init map
function initMap() {
  var center = {lat: 44.40011, lng: -79.66634};

	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 10,
	    center: center
	  });
	var infowindow =  new google.maps.InfoWindow({});
	var marker, count;
	for (count = 0; count < locations.length; count++) {
	    marker = new google.maps.Marker({
	      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
	      map: map,
	      title: locations[count][0]
	    });
	google.maps.event.addListener(marker, 'click', (function (marker, count) {
	      return function () {
	        infowindow.setContent(locations[count][0]);
	        infowindow.open(map, marker);
	      }
	    })(marker, count));
	  }
}

//create variables that store a reference to header and section elements
let header = document.querySelector('header');
let section = document.querySelector('section');

//create a variable to store request URL
let requestURL = "https://DoodlyDoodler.github.io/WeirdDeals/Products.json";

// create a new XHR object
let request = new XMLHttpRequest();

//open a new request, using the open method
request.open('GET', requestURL);

//set up the request to accept JSON

request.responseType = 'json';

//send the request using the send method

request.send();


//adding an event handler that listens for onload event of the JSON file/object
request.onload = function() {
  let WeirdDealsInc = request.response;
  console.log(WeirdDealsInc);
  populateHeader(WeirdDealsInc);
  items(WeirdDealsInc);
}

//set up populateHeader function to fill in the header function
function populateHeader(jsonObj) {

  // grab the company name from JSON object and then create a new element, adding text and appending to the header

  let headerH1 = document.createElement('h1');
  headerH1.textContent = jsonObj['companyName'];
  header.appendChild(headerH1);

  //grab the company info and established date and add a new paragraph to your HTML that displays this info

  let headerPara = document.createElement('p');
  headerPara.textContent = 'Head Office: ' + jsonObj['headOffice'] + ' , Established:  ' + jsonObj['established'];
  header.appendChild(headerPara);
}

// define the items function to show the flavours

function items(jsonObj) {

  //bind top flavours object to a variables
  let items = jsonObj['items'];

  for (let i = 0; i < items.length; i++) {
    //create a few different elements
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
		let p3 = document.createElement('p');
    let list = document.createElement('ul');

    //grab the data associated with image to set the src and alt attribute
    img.setAttribute('src', 'https://DoodlyDoodler.github.io/WeirdDeals/images/' + items[i].image);
    img.setAttribute('alt', items[i].image );

    h2.textContent = items[i].name;
    p1.textContent = 'Price: ' + items[i].Price;
    p2.textContent = 'Description: ' + items[i].Description;
		p3.textContent = 'Location: ' + items[i].Location;

    let Features = items[i].Features;
    for(let j = 0; j < Features.length; j++ ) {
      let listItem = document.createElement('li');
      listItem.textContent = Features[j];
      list.appendChild(listItem);
    }

    // Append each element to article, then append article to section

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
		article.appendChild(p3);
    article.appendChild(list);
    section.appendChild(article);

  }

}
