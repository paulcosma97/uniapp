# UniApp

Student Attendance PWA for Universities

## Short Description

This project deals with student course attendance. It looks vaguely similar to Google Classroom but the main difference is that students can "Mark as Attended" course series.

Several checks are made before marking a course as attended, such as: Network check to ensure that the student is in the course room, QR codes with limited lifespan, location check.

Since creating separate clients for each operating systems requires a lot of time and I'm not a big fan of hybrid applications, I decided to make it a Progressive Web App. This way, instead of 2 or 3 code bases, I'm using only one.

To achieve this, I used: Node.js with Express and Typescript for the backend, and React with Hooks, Redux Saga and Antd Component Library for the frontend.


## Preview

### Home

![Home](/previews/homepage.png)
Format: ![Home](url)

### Course details from teacher's POV

![Teacher Course Details](/previews/teacher_course.png)
Format: ![Teacher Course Details](url)

### Course details from student's POV

![Student Course Details](/previews/student_course.png)
Format: ![Student Course Details](url)

### Course list from teacher's POV

![Student Course List](/previews/teacher_course_list.png)
Format: ![Student Course List](url)

### More

All of the other pages can be seen in the `previews` directory.