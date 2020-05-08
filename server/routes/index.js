const express = require('express');
const fs = require('fs');
const readline = require('readline');
var path = require('path');
const { google } = require('googleapis');
const credentials = require('../config/credentials.json');
//const token = require('../config/token.json');
const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly'
];
const TOKEN_PATH = path.join(__dirname, '../config/token.json') ;

let router = express.Router();

router.get('/auth/google', (req, res, next) => {
  authorize(getNewToken);
  function authorize(callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    callback(oAuth2Client);
  }
  function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    return res.json({authUrl});
  }
});

router.post('/classroom/courses', function (req, res, next) {
  var decodedCode = req.body.decodedCode;
  // var decodedCode = req.body['authCode'];
  console.log("Code:  "+decodedCode);
  createOAuth2Client();
  function createOAuth2Client() {
    const { client_id, client_secret, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    setToken(oAuth2Client, listCourses, res);
  }
  function setToken(oAuth2Client, callback, res) {
    oAuth2Client.getToken(decodedCode, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to ', TOKEN_PATH);
      });
      callback(oAuth2Client, res);
    });
  }
  function listCourses(auth, response) {
    const classroom = google.classroom({ version: 'v1', auth });
    classroom.courses.list(
      {
        pageSize: 10
      },
      (err, response) => {
        if (err) return console.error('The API returned an error: ' + err);
        const courses = response.data.courses;
        if (courses && courses.length > 0) {
          res.json({courses: courses});
        } else {
          res.json({message: "No Courses Found"});
        }
      }
    );
  }
});

router.get('/google/classroom/people', function(req, res) {
  const {course_Id} = req.query;
  if(!course_Id) {
    return res.send("Provide a course_ID to list Teachers, Students");
  }
  let classroomTeachers = [];
  let classroomStudents = [];
  createOAuth2Client();
  function createOAuth2Client() {
    const { client_id, client_secret, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    setToken(oAuth2Client, listPeople, res);
  }
  function setToken(oAuth2Client, callback, res) {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if(err) {
        return res.json({message: "You are not authorized"});
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, res);
      }
    });
  }
  async function listPeople(auth, response) {
    const classroom = google.classroom({version: 'v1', auth});
    await classroom.courses.teachers.list({
      courseId: course_Id
    }).then((resp, err) => {
      if (err) {
        console.log("Error retrieving teachers: "+err);
        return res.send(err);
      } else {
            resp.data.teachers.forEach((teacher) => {
            classroomTeachers.push(teacher);
          });
      }
    });
    await classroom.courses.students.list({
      courseId: course_Id
    }).then((resp, err) => {
      if (err) {
        console.log("Error retrieving students: "+err);
        return res.send(err);
      } else {
            resp.data.students.forEach((student) => {
            classroomStudents.push(student);
          });
      }
    });
    res.json({teachers: classroomTeachers, students: classroomStudents});
  }
});

module.exports = router;
