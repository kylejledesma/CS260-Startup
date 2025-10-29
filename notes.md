# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

I refactored the HTML links into NavLinks for use within JSX
I refactored the HTML into valid JSX syntax for integration with React

In the following code, what does the link element do?
In the following code,  what does a div tag do?
In the following code, what is the difference between the #title and .grid selector?
In the following code, what is the difference between padding and margin?
Given this HTML and this CSS how will the images be displayed using flex?
What does the following padding CSS do?
What does the following code using arrow syntax function declaration do?
What does the following code using map with an array output?
What does the following code output using getElementByID and addEventListener?
What does the following line of Javascript do using a # selector?
Which of the following are true? (mark all that are true about the DOM)
By default, the HTML span element has a default CSS display property value of: 
How would you use CSS to change all the div elements to have a background color of red?
How would you display an image with a hyperlink in HTML?
In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
What will the following code output when executed using a for loop and console.log?
How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
How do you declare the document type to be html?
What is valid javascript syntax for if, else, for, while, switch statements?
What is the correct syntax for creating a javascript object?
Is it possible to add new properties to javascript objects?
If you want to include JavaScript on an HTML page, which tag do you use?
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
Which of the following correctly describes JSON?
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
Which of the following console command creates a remote shell session?
Which of the following is true when the -la parameter is specified for the ls console command?
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
Is a web certificate is necessary to use HTTPS.
Can a DNS A record can point to an IP address or another A record.
Port 443, 80, 22 is reserved for which protocol?
What will the following code using Promises output when executed?


In the following code, what does the link element do?
It links an external resource (usually a CSS file) to the HTML document. Example: <link rel="stylesheet"
href="styles.css"> applies styles from styles.css to the page.
In the following code, what does a div tag do?
A &lt;div&gt; is a block-level container that groups other elements. It's used for structure and layout.
Examples (use in layouts):
&lt;div class="header"&gt; ... &lt;/div&gt;
&lt;div class="content"&gt; ... &lt;/div&gt;
Divs have default display:block and take full width. They don't add behavior by themselves.
In the following code, what is the difference between the #title and .grid selector?
#title selects an element by ID (unique). .grid selects elements by class (can apply to multiple elements).
In the following code, what is the difference between padding and margin?
Padding: space inside the element (between content and border). Margin: space outside the element (between
border and other elements).
Given this HTML and this CSS how will the images be displayed using flex?
If the container uses display: flex;, the images will be displayed in a row by default, side by side, unless
flex-direction: column; is specified.
What does the following padding CSS do?
Example: padding: 10px 20px; adds 10px top/bottom and 20px left/right inside the element.
What does the following code using arrow syntax function declaration do?
Arrow functions are a compact function syntax. (a, b) => a + b means a function with parameters a and b that
returns a+b.
Examples:
const add = (a, b) => a + b;
const greet = name => `Hi ${name}`;
const square = x => { return x * x; } // block form
Note: arrow functions do not bind their own 'this' and are not suitable as constructors.
What does the following code using map with an array output?
map() transforms every element of an array and returns a new array without mutating the original.
Examples:
const nums = [1,2,3];
const doubled = nums.map(n => n * 2); // [2,4,6]
const names = ['Amy','Bob'];
const greetings = names.map(n => `Hi ${n}`); // ['Hi Amy','Hi Bob']
What does the following code output using getElementByID and addEventListener?
Typical pattern:
const btn = document.getElementById('btn');
btn.addEventListener('click', () => console.log('Clicked!'));
Behavior: When user clicks the element with id 'btn', the callback runs and prints 'Clicked!'.
What does the following line of Javascript do using a # selector?
document.querySelector('#title') selects the first element that matches the CSS selector #title (elemequerySelector accepts any CSS selector (classes, attributes, pseudos).
Which of the following are true? (mark all that are true about the DOM)
The DOM represents the HTML document as a tree of objects. You can use JavaScript to access and modify
DOM elements. Each HTML element is a node in the DOM.
By default, the HTML span element has a default CSS display property value of:
inline
How would you use CSS to change all the div elements to have a background color of red?
div { background-color: red; }
How would you display an image with a hyperlink in HTML?
Wrap the &lt;img&gt; element with an &lt;a&gt; tag. Ensure the image file is in the correct folder (public or
images/) and the src path points to it.
Example:
&lt;a href="https://example.com"&gt;
 &lt;img src="images/logo.png" alt="Logo"&gt;
&lt;/a&gt;
Folder scheme example:
project/
 index.html
 images/
 logo.png
 css/
 styles.css
If using a framework, the image may need to be in a 'public' or 'static' folder so it is served directly
In the CSS box model, what is the ordering of the box layers starting at the inside and working
out?
Order: Content -> Padding -> Border -> Margin
Diagram:
+----------------+
| Margin |
| +------------+ |
| | Border | |
| | +--------+ | |
| | |Padding | | |
| | |Content | | |
| | +--------+ | |
| +------------+ |
+----------------+
Padding increases size inside border; margin creates space between elements.
Given the following HTML, what CSS would you use to set the text "trouble" to green and leave
the "double" text unaffected?
Given <p><span class="trouble">trouble</span> double</p>, use .trouble { color: green; }
What will the following code output when executed using a for loop and console.log?
for (let i = 0; i < 3; i++) { console.log(i); }
This initializes i=0, checks i<3 each loop, runs body and increments i++ after each iteration. Output 
How would you use JavaScript to select an element with the id of “byu” and change the text
color of that element to green?
Option 1 (direct):
document.getElementById('byu').style.color = 'green';
Option 2 (variable):
const byu = document.getElementById('byu');
byu.style.color = 'green';
Explanation: getElementById returns the DOM element. Assigning to variable avoids querying repeatedly.
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level
heading, first level heading, third level heading?
Paragraph: <p>, Ordered list: <ol>, Unordered list: <ul>, h2: <h2>, h1: <h1>, h3: <h3>
How do you declare the document type to be html?
<!DOCTYPE html>
What is valid javascript syntax for if, else, for, while, switch statements?
if (x > 5) { ... } else { ... } for (...) { ... } while (...) { ... } switch (x) { case 1: ...; break; default: ... }
What is the correct syntax for creating a javascript object?
const person = { name: "John", age: 30 };
Is it possible to add new properties to javascript objects?
Yes. Example: person.city = "Provo";
If you want to include JavaScript on an HTML page, which tag do you use?
<script src="script.js"></script>
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and
leave the "fish" text unaffected?
HTML:
<p id="animal">animal</p>
<p id="fish">fish</p>
Option 1 (direct):
document.getElementById('animal').textContent = 'crow';
Option 2 (variable):
const animal = document.getElementById('animal');
animal.textContent = 'crow';
Both work; second is clearer if reusing element.
Which of the following correctly describes JSON?
JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs. Example: {
"name": "John", "age": 25 }
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps,
wget, sudo do?
chmod - change permissions, pwd - print working directory, cd - change directory, ls - list files, vim/nano - text
editors, mkdir - make directory, mv - move/rename, rm - remove, man - manual, ssh - remote shell, ps -
processes, wget - download files, sudo - run as admin
Which of the following console command creates a remote shell session?
ssh
Which of the following is true when the -la parameter is specified for the ls console command?
ls -la lists all files (including hidden) in long format
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top
level domain, which is a subdomain, which is a root domain?
TLD: .click, root domain: bozo.click, subdomain: fruit.bozo.click (and banana.fruit.bozo.click is a nested
subdomain)
Is a web certificate is necessary to use HTTPS.
Yes, HTTPS requires a valid SSL/TLS certificate.
Can a DNS A record can point to an IP address or another A record.
A DNS A record points to an IP address; it should not point to another A record
Port 443, 80, 22 is reserved for which protocol?
443 -> HTTPS, 80 -> HTTP, 22 -> SSH
What will the following code using Promises output when executed?
Many possibilities depending on promise behavior. Examples:
1) Promise.resolve('Done').then(console.log) -> 'Done'
2) Promise.reject('Error').catch(console.error) -> 'Error'
3) new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) -> 'Hi' after 1s
4) Async function returns value -> printed when awaited or .then
5) Promise chain: Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) -> 5
6) Reject handled -> shows error via catch.


HTML Fundamentals

1. <link> element

Used in the <head> to link external resources (usually CSS files).
Example: <link rel="stylesheet" href="styles.css">

2. <div> tag

Generic block-level container for grouping elements.

Has no inherent styling — used for layout or structure.

3. Display defaults

<div> → display: block

<span> → display: inline

4. Displaying an image with a hyperlink

<a href="https://example.com">
  <img src="image.jpg" alt="Description">
</a>


5. Opening tags

Element	Opening Tag
Paragraph	<p>
Ordered list	<ol>
Unordered list	<ul>
Heading 1	<h1>
Heading 2	<h2>
Heading 3	<h3>

6. Declare HTML5 document type

<!DOCTYPE html>

🎨 CSS Concepts

7. #title vs .grid selector

#title → targets an element with id="title"

.grid → targets all elements with class="grid"

8. Padding vs Margin

Padding → space inside an element’s border (between content and border)

Margin → space outside the element (between border and neighboring elements)

9. Box model order (inside → outside)
👉 content → padding → border → margin

10. Flexbox image display

display: flex arranges child elements (e.g. images) in a row (default).

justify-content, align-items, and flex-wrap control layout and spacing.

11. Padding CSS example

padding: 10px 20px; /* top/bottom = 10px, left/right = 20px */


12. Change all divs to red background

div {
  background-color: red;
}


13. Set “trouble” text green but not “double”

<p><span class="trouble">trouble</span> double</p>

.trouble {
  color: green;
}

⚙️ JavaScript Basics

14. Arrow function syntax

const add = (a, b) => a + b;


Concise function syntax, this is lexically bound.

15. map() with array

Returns a new array with function applied to each element.
Example:

[1, 2, 3].map(x => x * 2); // [2, 4, 6]


16. getElementById and addEventListener

document.getElementById("btn").addEventListener("click", () => {
  console.log("Clicked!");
});


Selects element by id, runs code on click.

17. # selector in JS

Used with querySelector for id selection:
document.querySelector("#title") = select element with id “title”.

18. Change element color by id

document.getElementById("byu").style.color = "green";


19. Basic JS syntax

if/else:
if (x > 5) { ... } else { ... }

for:
for (let i = 0; i < 5; i++) { ... }

while:
while (condition) { ... }

switch:
switch(x) { case 1: ... break; default: ... }

20. Create a JS object

const person = { name: "Kyle", age: 20 };


21. Add new property

person.job = "student"; // ✅ yes, possible


22. Include JavaScript in HTML

<script src="script.js"></script>


23. Change “animal” text to “crow”

<p id="animal">fish</p>
<p id="bird">animal</p>

document.getElementById("bird").textContent = "crow";


24. JSON description

JavaScript Object Notation — lightweight data format.

Uses key-value pairs:
{"name": "Kyle", "age": 20}

25. Promise output example

Promise.resolve("Done").then(console.log); // Output: "Done"

🌐 System & Networking

26. Common terminal commands

Command	Description
chmod	Change file permissions
pwd	Print working directory
cd	Change directory
ls	List files
vim / nano	Text editors
mkdir	Create directory
mv	Move or rename file
rm	Remove file
man	Show manual/help
ssh	Connect to remote server (remote shell)
ps	Show running processes
wget	Download from the web
sudo	Run command as superuser (admin)

27. Remote shell command
✅ ssh

28. ls -la

Lists all files (including hidden) in long format (permissions, size, date).

29. Domain structure

banana.fruit.bozo.click

TLD: .click

Root domain: bozo.click

Subdomain: banana.fruit

30. HTTPS certificate

✅ Required for HTTPS (TLS/SSL encryption)

31. DNS A record

Points to an IP address, not another A record (must use CNAME for that).

32. Reserved ports

Port	Protocol
443	HTTPS
80	HTTP
22	SSH


=================== Reactivity ======================

React.useState() returns an array pair with two values:
  1. variable
  2. function that changes the variable

Big learn of the day:
Making a component reactive basically means that you make static html documents dynamic using {insert variable or function here} inside html code. You also deploy html through a react function that returns to the browser the html code.

