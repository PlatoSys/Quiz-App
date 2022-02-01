# QuizApp - Installation Guide

## Python - Main Dir
### python -m venv env
### Windows - source ./env/Scripts/activate
### Linux - source ./env/bin/activate
### pip install -r requirements.txt
<hr/>

### DB is already filled with questions but if you want to add more please run -><b>python manage.py db_dump</b> <br>
### python manage.py runserver
<hr/>

### superuser: quizadmin <br>
### password: quizadmin

<hr>

## React - Frontend Dir (In New Terminal)
### cd frontend
### npm install / yarn install
### npm start / yarn start
<hr>

# Development Roadmap
## Backend
### I've decided to build REST architecture for this task. Created new 'quiz' app which serves all the nacessary requests from frontend. for user I've user built-in User and admin is authorized using simple-jwt token.
### For testing purposes I've used django Test and covered all the apis and model creation parts as well. During development process I've used postman to test API endpoints.
### Also created CI Job in gitlab for tests and python code is validated with flake8.
<hr>

## Frontend
### I've used react and divided App with screens and components, for routing I've used React-router. For State managment I've avoided redux due to project size and went along with useState and useContext.
### Lighthouse Report - 96/98/100/100
<hr>