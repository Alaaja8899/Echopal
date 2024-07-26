import admin from "firebase-admin"
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // or provide the path to your service account key file
  credential: admin.credential.cert('echopal-firebase-adminsdk-ztcw4-aaa080cd32.json')
});



export async function getAllUsers() {
    const users = [];
    try {
      // List all users
      const listUsersResult = await admin.auth().listUsers();
  
      listUsersResult.users.forEach(userRecord => {
        const user = {
          name: userRecord.displayName,
          photo: userRecord.photoURL,
          createdAt: userRecord.metadata.creationTime
        };
        users.push(user);
      });
  
      return users;
    } catch (error) {
      console.error('Error listing users:', error);
      return [];
    }
  }
  
getAllUsers().then(users => {
  console.log(users);
});  


