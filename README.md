<<<<<<< HEAD
# CalendarSync

[My Notes](notes.md)

Enough haggling back and forth, this application helps you find out when works for you and your team! Meetings, hangouts or simply finding free time in your schedules, use CalendarSync now!


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Finding time with a team shouldn’t feel like solving a puzzle. Our collaborative scheduling web app makes it simple: each member quickly drags and drops their time blocks (classes, meetings, social events, etc.) onto a personal calendar, then the app merges everyone’s schedules into one group view. The shared calendar highlights free time slots and least-busy options, so groups can effortlessly find the best time to meet without endless text threads or doodle polls. Make frustrating availability coordination a thing of the past!

### Design

![Design image](images/homepage.png)

The homepage describes the purpose of the website and teaches users how to use it!

![Design image](images/create-page.png)

The create page allows users to create a group calendar...

![Design image](images/join-page.png)

While the join page allows users to join existing calendars.

![Design image](images/calendar-page.png)

The calendar page offers a quick and easy way for individuals to drag and drop color coded activities onto an individual calendar, which will be compiled for their collective viewing and decision making on the group calendar.

```mermaid
sequenceDiagram
    actor You
    actor Website
    You->>Website: Replace this with your design
```

### Key features

- Secure login with group code (like Kahoot PIN) and user credentials
- Drag-and-drop calendar interface to add personal commitments
- Color-coded time blocks (Classes, Homework, Meetings, Social, etc.)
- Real-time group calendar view showing overlapping commitments
- Automatic highlight of free/common time slots
- Ability to edit and resubmit individual schedules
- Persistent storage of schedules in the database
- Aesthetic and responsive calendar display for desktop and mobile
- Admin functionality to create/delete groups

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three main pages: Login page (with group code entry) and Calendar page (drag-and-drop interface) for individual and team. Two additional Create and Join Pages.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Login form, Calendar interface, Group calendar display. React Router for navigation.
- **Service** - Backend service with endpoints for
  * Login
  * Schedule - Submit user's calendar blocks
  * Schedule - Retrieving team's calendar blocks
- **DB/Login** - Store users, individual calendars, and team calendars in database. Register and login users. Credentials securely stored in database. Can't schedule unless authenticated.
- **WebSocket** - As each user submits their schedules, their time blocks are broadcast to all other users to view.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
=======
# CalendarSync

[My Notes](notes.md)

Enough haggling back and forth, this application helps you find out when works for you and your team! Meetings, hangouts or simply finding free time in your schedules, use CalendarSync now!


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Finding time with a team shouldn’t feel like solving a puzzle. Our collaborative scheduling web app makes it simple: each member quickly drags and drops their time blocks (classes, meetings, social events, etc.) onto a personal calendar, then the app merges everyone’s schedules into one group view. The shared calendar highlights free time slots and least-busy options, so groups can effortlessly find the best time to meet without endless text threads or doodle polls. Make frustrating availability coordination a thing of the past!

### Design

![Design image](homepage.png)

The homepage describes the purpose of the website and teaches users how to use it!

![Design image](create-page.png)

The create page allows users to create a group calendar...

![Design image](join-page.png)

While the join page allows users to join existing calendars.

![Design image](calendar-page.png)

The calendar page offers a quick and easy way for individuals to drag and drop color coded activities onto an individual calendar, which will be compiled for their collective viewing and decision making on the group calendar.

```mermaid
sequenceDiagram
    actor You
    actor Website
    You->>Website: Replace this with your design
```

### Key features

- Secure login with group code (like Kahoot PIN) and user credentials
- Drag-and-drop calendar interface to add personal commitments
- Color-coded time blocks (Classes, Homework, Meetings, Social, etc.)
- Real-time group calendar view showing overlapping commitments
- Automatic highlight of free/common time slots
- Ability to edit and resubmit individual schedules
- Persistent storage of schedules in the database
- Aesthetic and responsive calendar display for desktop and mobile
- Admin functionality to create/delete groups

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three main pages: Login page (with group code entry) and Calendar page (drag-and-drop interface) for individual and team. Two additional Create and Join Pages.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Login form, Calendar interface, Group calendar display. React Router for navigation.
- **Service** - Backend service with endpoints for
  * Login
  * Schedule - Submit user's calendar blocks
  * Schedule - Retrieving team's calendar blocks
- **DB/Login** - Store users, individual calendars, and team calendars in database. Register and login users. Credentials securely stored in database. Can't schedule unless authenticated.
- **WebSocket** - As each user submits their schedules, their time blocks are broadcast to all other users to view.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
>>>>>>> c0af83eccbc8739cd8099316cc43da75d61c2a3f
