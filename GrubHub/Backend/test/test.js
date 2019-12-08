var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var inputPassword = "123";
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(inputPassword,salt);
var encPassword = hash;

var app = 'http://localhost:3001';


var assert = require('assert');
var expect = chai.expect;

describe('Grubhub Test Cases', function() {
    this.timeout(150000);
    it("Test Case 1 : Signup Owner", function(done) {

        const data = {
            "firstName" : "Test",
            "lastName" : "Mocha",
            "email" : "a@b.com",
            "password" : "123",
            "restaurantName" : "abc",
            "restaurantZipCode" : "1233",
            "owner" : "Owner"
        }

        console.log(data);

        chai.request(app)
        .post('/Signup/Owner')
        .send(data)
        .end(function(err,res) {
            //console.log(res);
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 2 : Item Add Page", function(done) {

        const data = {
            "itemName" : "Pancake",
            "itemDesc" : "Cheesy",
            "itemPrice" : "12",
            "itemSection" : "Lunch",
            "restaurantName" : "mg"
        }

        chai.request(app)
        .post('/Menu/ItemAddPage')
        .set({'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE0ZDY1YTEzNDg1ZDRjZjgxZmNmODEiLCJGaXJzdE5hbWUiOiJld2VmZmV3Znd3dHIiLCJMYXN0TmFtZSI6ImdlZ2UiLCJFbWFpbCI6ImdnZ0BnLmNvbSIsIlBhc3N3b3JkIjoiJDJhJDEwJFhST2xXUThuM3hHQXEyT1lyeXpDZk9ya3NuTzVkb3Q5eHVOY3VLeGFGaHovQUlhZnhwM3B5Iiwicm9sZSI6IkJ1eWVyIiwiX192IjowLCJQaG9uZU51bWJlciI6Ijg4ODg3ODQxODciLCJpYXQiOjE1NzMwMDA4NTMsImV4cCI6MTU3MzAxMDkzM30.yCuxXIgYT0zhHIY5vyuAX0Z0xGfzKk_CHPobG77DKLs'})
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 3 : Section Add Page", function(done) {

        const data = {
            "sectionName" : "Dinner",
            "sectionDesc" : "Creamy",
            "restaurantName" : "mg"
        }

        chai.request(app)
        .post('/Menu/SectionAddPage')
        .set({'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE0ZDY1YTEzNDg1ZDRjZjgxZmNmODEiLCJGaXJzdE5hbWUiOiJld2VmZmV3Znd3dHIiLCJMYXN0TmFtZSI6ImdlZ2UiLCJFbWFpbCI6ImdnZ0BnLmNvbSIsIlBhc3N3b3JkIjoiJDJhJDEwJFhST2xXUThuM3hHQXEyT1lyeXpDZk9ya3NuTzVkb3Q5eHVOY3VLeGFGaHovQUlhZnhwM3B5Iiwicm9sZSI6IkJ1eWVyIiwiX192IjowLCJQaG9uZU51bWJlciI6Ijg4ODg3ODQxODciLCJpYXQiOjE1NzMwMDA4NTMsImV4cCI6MTU3MzAxMDkzM30.yCuxXIgYT0zhHIY5vyuAX0Z0xGfzKk_CHPobG77DKLs'})
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 4 : Section Remove Page", function(done) {

        const data = {
            "itemToRemove" : "Dinner",
        }

        chai.request(app)
        .post('/Menu/ItemRemovePage')
        .set({'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE0ZDY1YTEzNDg1ZDRjZjgxZmNmODEiLCJGaXJzdE5hbWUiOiJld2VmZmV3Znd3dHIiLCJMYXN0TmFtZSI6ImdlZ2UiLCJFbWFpbCI6ImdnZ0BnLmNvbSIsIlBhc3N3b3JkIjoiJDJhJDEwJFhST2xXUThuM3hHQXEyT1lyeXpDZk9ya3NuTzVkb3Q5eHVOY3VLeGFGaHovQUlhZnhwM3B5Iiwicm9sZSI6IkJ1eWVyIiwiX192IjowLCJQaG9uZU51bWJlciI6Ijg4ODg3ODQxODciLCJpYXQiOjE1NzMwMDA4NTMsImV4cCI6MTU3MzAxMDkzM30.yCuxXIgYT0zhHIY5vyuAX0Z0xGfzKk_CHPobG77DKLs'})
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 5 : Search Page", function(done) {

        const data = {
            "searchItem" : "Pizza",
        }

        chai.request(app)
        .post('/SearchResults')
        .set({'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE0ZDY1YTEzNDg1ZDRjZjgxZmNmODEiLCJGaXJzdE5hbWUiOiJld2VmZmV3Znd3dHIiLCJMYXN0TmFtZSI6ImdlZ2UiLCJFbWFpbCI6ImdnZ0BnLmNvbSIsIlBhc3N3b3JkIjoiJDJhJDEwJFhST2xXUThuM3hHQXEyT1lyeXpDZk9ya3NuTzVkb3Q5eHVOY3VLeGFGaHovQUlhZnhwM3B5Iiwicm9sZSI6IkJ1eWVyIiwiX192IjowLCJQaG9uZU51bWJlciI6Ijg4ODg3ODQxODciLCJpYXQiOjE1NzMwMDA4NTMsImV4cCI6MTU3MzAxMDkzM30.yCuxXIgYT0zhHIY5vyuAX0Z0xGfzKk_CHPobG77DKLs'})
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })
})