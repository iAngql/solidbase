# **solidbase**

### To get started you have to install the required modules to run.
### You can do that by running this command in the root of the project:
```powershell
$ npm install
```
#
### Now since you have all the required modules installed, you can run the server by running
```powershell
$ node index.js
```
### or
```powershell
$ node .
```

#
## **Create data**
### Since the server is running, you can actually start contracting with it.
### So let's start by creating some data
```powershell
$ curl -d "DataName=user&name=John&age=19" -X POST http://(whereever your server is running at)/create
```
you can add more data as much as you want 

## ***Keep in mind***
* **You have to specify `DataName` as it is a required value to define in your data files.**
* **You have to be in the `/create` location in the server to create data.**

#

## **Read & Delete data**
### Reading and deleting data are easier than creating them, because you only need to specify the `DataName` you want to read or delete

## Read data
```powershell
$ curl -d "DataName=(data to read)" -X POST http://(wherever your server is running at)/read
```
## Delete data
```powershell
$ curl -d "DataName=(data to delete)" -X POST http://(wherever your server is running at)/delete
```