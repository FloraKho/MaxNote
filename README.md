
# Maxnote 📚 

Maxnote is a clone of the popular note-taking application - [Evernote](https://evernote.com/). The Maxnote features creating, reading, editing, and removing notes and notebooks. The notes and notebooks are saved in the cloud using PostgreSQL and Amazon AWS.

**Live site:**  [Maxnote](https://maxnote.herokuapp.com/) 

## Wiki Link  ✅

* [Database Schema](https://github.com/FloraKho/MaxNote/wiki/Database-Schema)
* [Feature List](https://github.com/FloraKho/MaxNote/wiki/Feature-List)
* [User Stories](https://github.com/FloraKho/MaxNote/wiki/User-Stories)



## Tech Stack 👩‍💻 

**Frameworks, Platforms and Libraries:**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:** 

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

**Packages:**
[Quill](https://github.com/quilljs/quill) 


## Preview 💚
### Landing Page
![LandingPage](./react-app/public/images/LandingPage.gif)

### Login Page



## Run Locally 🖥

#### Clone the project

```bash
  git clone https://github.com/FloraKho/MaxNote.git
```

#### Install dependencies

```bash
  pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

#### Create a **.env** file 
```bash
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=
   DATABASE_URL=
   S3_BUCKET=<your bucket name>
   S3_KEY=<Access key Id>
   S3_SECRET=<Secret access key>
```

#### Setup your PostgreSQL user, password and database
```bash
   CREATE USER <USERNAME> WITH PASSWORD 'password';
   CREATE DATABASE <DATABASENAME> WITH ONWER <USERNAME>;
```

#### Get into your pipenv, migrate your database, seed your database, and run your flask app


```bash
   pipenv shell
```

```bash
   flask db upgrade
```

```bash
   flask seed all
```

```bash
   flask run
```

#### Run the React App in development
```bash
   cd react-app
```
```bash
   npm install
```



