// loadcontent.js

// simple AJAX request to load in page content

function load_content(name, div) {

	let xmlhttp = new XMLHttpRequest({mozSystem: true});

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
			content_div = document.getElementById(div);
			content_div.innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("GET","content/" + name,true);
	xmlhttp.send();
}

// Ran on key release.
// Checks if the term in the search box matches the name of any content
// If it does, load in that content with load_content()

function load_section(name) {

    // shortcuts
    shortcuts = {
        yt: 'https://www.youtube.com/',
        dc: 'https://discord.com/app',
        mya: 'https://myabertay.mydaycloud.com/dashboard/home',
        mail: 'https://www.fastmail.com/mail/Inbox/'
    }

	// pages is the array of page names
	// To add more pages just put the name of the new page here
	// eg for uni.html add "uni"
	pages = ["homelab", "general"]

	document.getElementById("results").innerHTML = "";	

	if (name.length == 0) return;

    for (let [key, val] of Object.entries(shortcuts)) {
        if (key == name) {
            window.location.href = val;
        }
    }

	// for each page
	for (let i = 0; i < pages.length; i++) {
		// if the search term matches this page
		if (pages[i] == name) {

			// load the content
			load_content(pages[i] + ".html", "content");

			// clear suggestions
			document.getElementById("results").innerHTML = "";	

		// else if the search term starts with this page name
		} else if (pages[i].startsWith(name)) {

			// append the name of this page to the suggestions
			document.getElementById("results").innerHTML += pages[i] + "\n";	

		}
	}
}

// Load a DuckDuckGo search with the search box phrase and custom CSS colours

function search() {

	let bg_colour = getComputedStyle(document.documentElement).getPropertyValue('--background');
	let title_colour = getComputedStyle(document.documentElement).getPropertyValue('--color7');
	let desc_colour = getComputedStyle(document.documentElement).getPropertyValue('--color7');
	let url_colour = getComputedStyle(document.documentElement).getPropertyValue('--color5');
	let visited_colour = getComputedStyle(document.documentElement).getPropertyValue('--color4');

	window.open('https://www.duckduckgo.com/' +
							'?q=' + document.getElementsByTagName("input")[0].value +
							'&k7=' + bg_colour +
							'&kj=' + bg_colour +
							'&k9=' + title_colour +
							'&k8=' + desc_colour +
							'&kx=' + url_colour +
							'&kae=' + 't' +
							'&kaa=' + visited_colour, '_self');
	
}

// if enter is pressed and the search box is focused, run a DuckDuckGo search

document.onkeydown = function(event) {
	if (event.key === "Enter" && document.getElementsByTagName("input")[0] === document.activeElement) {
	    event.preventDefault();
			search()
	}
}

// check for new background

background = ""

function compare_background(b) {
    if (background != b) {
        background = b;
        location.reload();
    }
}

function update_background() {
    fetch('wal')
        .then(r => r.text())
        .then(t => compare_background(t))
}

fetch('wal')
    .then(r => r.text())
    .then(t => background = t)

setInterval(update_background, 100)
