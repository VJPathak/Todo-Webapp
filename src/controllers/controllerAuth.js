//importing modules and libaries
const constVar = require('../config/constants');
const admin = require('firebase-admin');

const serviceAccount = require("../config/mydemodb-c3b5b-firebase-adminsdk-y7tm4-4f24d8dbe5.json");

//initializing our secret key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//Function to get userlist data
async function getDetails(id) {
  const getData = db.collection('userList');
  let a = id
    const snap = await getData.where("createdBy", '==', a).get();
    if (snap.empty) {
      console.log('No matching documents.');
      return;
    }  

    let viewData = []
    snap.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      viewData.push({name:doc.data().name,
      phno: doc.data().phno, id: doc.id, email: doc.data().email})
    });
    return viewData
  }


//post signup controller
const postSignup = (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let cmpass = req.body.cmpass;
    let phno = req.body.phno;
    let gender = req.body.gender;
    let state = req.body.state;
    let city = req.body.city;
    console.log(name,email,pass, phno, gender); 

    if(pass != cmpass){
        res.render("signup", {data : "Confirm Password Is Not Same As Password, Pl Try Again"});
    }
    else{
    
    async function run() {
      
        const data = {name: name, email: email, pass:  pass, phno: phno, gender: gender,
        state: state, city: city, isActive: 1};
        await db.collection('userData').add(data);
        }

    run().catch(console.error);
    res.redirect("login");
}
}; 


//post post user list controller
 const postUserList = (req, res) => {
    
  let name = req.body.name;
  let email = req.body.email;
  let phno = req.body.phno;

  console.log(name,email,phno); 
  
  async function run() {
    const data = {
    name: name,
    email: email,
    phno: phno,
    isActive: 1,
    createdBy: req.session.userId 
    };
    await db.collection('userList').add(data);
    let viewData = await getDetails(req.session.userId)

    console.log(viewData)
    res.render("homepage", {data : viewData});
    }

    run().catch(console.error);

    // let viewData = getDetails(req.session.userId)
    // console.log(viewData)
    // res.render("homepage", {data : viewData});
}; 


//post login controller
 const postLogin = (req, res) => {

  let email = req.body.email;
  let pass = req.body.pass;
 
  console.log(email,pass); 
  
  async function run() {
    
    const loginData = db.collection('userData');
    const snapshot = await loginData.where('email', '==', email).where('pass', '==', pass).get();
    if (snapshot.empty) {
      console.log('Please Enter Valid details');
      res.render("login", {data : "Enter Valid Details"})
      return;
    }  

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      let id = doc.id
      req.session.userId = id;
      req.session.save();
    });

    console.log(req.session.userId)

    let viewData = await getDetails(req.session.userId)

    console.log(viewData)
    res.render("homepage", {data : viewData});
      
    }
    run().catch(console.error);
}; 


// get delete controller
const getDeleteUser = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let id = query.id;

  console.log(id)
 
  async function run() {
  await db.collection('userList').doc(id).delete();
  console.log("User Deleted")
  let viewData = await getDetails(req.session.userId)

    console.log(viewData)
    res.render("homepage", {data : viewData});
  }
  run().catch(console.error);
};

//get edit user controller
const getEditUser = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let id = query.id;
  let name = query.name;
  let email = query.email;
  let phno = query.phno;

  let editid = id
      req.session.editid = id;
      req.session.save();

  userData ={id: id, name : name, phno : phno, email : email}
  console.log(userData)
  res.render("editUser", {data : userData});

}; 

//post edit user
const postEditUser = (req, res) => {
  
  let name = req.body.name;
  let email = req.body.email;
  let phno = req.body.phno;

  async function run() {

  const editUser = db.collection('userList');
  const docRef = editUser.doc(req.session.editid);

    docRef.update({
      name: name,
      email: email,
      phno: phno
    })
      .then(() => {
        console.log('Document updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
    }
    run().catch(console.error);
  };

module.exports = {postSignup, postLogin, postUserList, getDeleteUser, getEditUser, postEditUser};