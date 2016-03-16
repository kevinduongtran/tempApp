# chatAppACM


A chat app built for our first UNLV ACM workshop by Kevin Duong-Tran to introduce Web Development. Front-end built using Jquery and Cookie.js with Firebase as a backend.

To get this for yourself, download the project with **Download ZIP** or do a **git clone**


## Setup with your own Logins and Firebase Database

1. Register on Firebase and create a new app. Take first subdomain of Firebase and paste it to line 2 of main.js

```javascript
var ref = new Firebase("https://< CHANGE TO YOUR OWN FIREBASE URL>.firebaseio.com/");
```

2. Assuming you are running the project locally, set **Authorized Domains for OAuth Redirects** to **localhost**


3. Under Firebase Dashboard, setup OAuth. Click on **Login & Auth** in side bar, Go under **Google** tab and check **Google**. Follow along with the tutorial on right side of screen on Firebase to setup **Google Client ID** and **Google Client Secret** or read below.

4. [Start here](https://console.developers.google.com) to create login with Google. After you make a Google associated app, search **credentials** on the upper search bar. Click on **Create Credentials** and follow along the setup instructions untill you get **Google Client ID** and **Google Client Secret**



