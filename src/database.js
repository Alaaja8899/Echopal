import { initializeApp } from "firebase/app";
import { getDatabase , remove   ,serverTimestamp , ref , set , onChildAdded , onValue , get , child , orderByChild, update} from "firebase/database";


export const config = {
    apiKey: "AIzaSyCl512gU4yx2Tb4-e0scq-_gw_3owzXJxk",
    authDomain: "echopal.firebaseapp.com",
    projectId: "echopal",
    storageBucket: "echopal.appspot.com",
    messagingSenderId: "581263441505",
    appId: "1:581263441505:web:708c1d8ba133ffdd373420"
  };


  const app = initializeApp(config);
export const database = getDatabase(app);



export const JoinUserToRoom = (photo , userID , name , RoomID) => {

  const location = JSON.parse(localStorage.getItem('location'))


  const messagesRef = ref(database, `Rooms/${RoomID}/users/${userID}` );
  set(messagesRef, {
    name : name, 
    uid : userID,
    photo:photo,
    // role :roleM,
    muted:true,
    timestamp: serverTimestamp(),
    city: location.City,
    country:location.Country
  }).then(() => {
    //
  }).catch((error) => {
    console.error('Error storing message:', error);
  });
};
export const setMicState = (userID, RoomID, mic) => {
  const userRef = ref(database, `Rooms/${RoomID}/users/${userID}`);
  update(userRef, {
    muted: mic
  }).then(() => {
    //
  }).catch((error) => {
    console.error('Error updating mic state:', error);
  });
};


export const CreateNewRoom = (Roomtitle , user) => {
    const messagesRef = ref(database, `Rooms/${user.uid}/` );
    set(messagesRef, {
        title : Roomtitle,
        timestamp : serverTimestamp() , 
        creator:user.displayName,
        userPhoto:user.photoURL
    }).then(() => {
      //
    }).catch((error) => {
      console.error('Error storing message:', error);
    }).finally(()=>{
    })
  };

  
export const CloseRoom=(RoomID)=>{
  const userRef = ref(database, `Rooms/${RoomID}`);
    
  remove(userRef).then(() => {
    console.log('User removed successfully');
  }).catch((error) => {
    console.error('Error removing user:', error);
  });

}



export const CheckAndCloseRoom = (RoomID) => {
  const usersRef = ref(database, `Rooms/${RoomID}/users`);
  
  get(usersRef).then((snapshot) => {
    if (!snapshot.exists()) {
      // No users in the room, close it
      CloseRoom(RoomID);
    } else {
      console.log('Users are still in the room, not closing.');
    }
  }).catch((error) => {
    console.error('Error checking users:', error);
  });
};



export const RemoveUserFromRoom = (userID, RoomID) => {
    const userRef = ref(database, `Rooms/${RoomID}/users/${userID}`);
    
    remove(userRef).then(() => {
      console.log('User removed successfully');
    }).catch((error) => {
      console.error('Error removing user:', error);
    });
  };





  export const getRoomTitle = async (roomId) => {
    const roomRef = ref(database, `Rooms/${roomId}`);
    
    try {
      const snapshot = await get(roomRef);
      if (snapshot.exists()) {
        return snapshot.val().title;
      } else {
        throw new Error('Room not found');
      }
    } catch (error) {
      console.error('Error fetching room title:', error);
      return null;
    }
  };






// export const getAllMessages = () => {
//   const db = getDatabase();
//   const messagesRef = ref(db, 'messages');

//   return get(messagesRef)
//     .then((snapshot) => {
//       const messagesArray = [];
      
//       if (snapshot.exists()) {
//         snapshot.forEach((childSnapshot) => {
//           const messageData = childSnapshot.val();
//           messagesArray.push({ id: childSnapshot.key, ...messageData });
//         });

//         // Sort messages by timestamp in descending order (most recent first)
//         messagesArray.sort((a, b) => b.timestamp - a.timestamp);
//       }

//       return messagesArray;
//     })
//     .catch((error) => {
//       console.error('Error getting messages:', error);
//       return []; // Return an empty array in case of an error
//     });
// };



// Usage example