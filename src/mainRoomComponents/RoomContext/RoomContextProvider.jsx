import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../../Context/Context'
import { setMicState } from '../../database'

import AgoraRTC from 'agora-rtc-sdk-ng'
import InRoomSound from '../../assets/sounds/in-room.wav'



const roomContext = createContext()


function RoomContextProvider({children}) {
    const [mic , setMic] = useState(false)
    const [ProfileOpen , setProfile]=useState(false)
    const [PopProfile , setPop] = useState({})
    const {user} = useAuthContext()
    const [activeSpeakers , setSpeakers] =useState([])
    const RoomTitle = "Hello world!"
    const [chatting , setChatting] = useState(false)


    const appID = 'bd8e061fa8a54f47b9c530538662bcad'


    const [rtcClient, setClient] = useState(null);
    const [audioTracks, setTracks] = useState({
      LocalAudioTrack: null,
      remoteAudioTracks: {}
    });
    let initRtc = async () => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      await setClient(client);
  
  
      await client.join(appID, localStorage.getItem('RoomID'), null, user.uid);
  
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await audioTrack.setMuted(!mic); // Mute the track initially
      await client.publish(audioTrack);
  
      setClient(client);
      setTracks(prevTracks => ({ ...prevTracks, LocalAudioTrack: audioTrack }));
      client.on("user-joined" , handleUserJoined)
    };
    const LeaveChanel = () => {
      if(audioTracks.LocalAudioTrack){
        audioTracks.LocalAudioTrack.stop()
        audioTracks.LocalAudioTrack.close()
      }

      if (rtcClient){
        rtcClient.unpublish()
        rtcClient.leave()  
      }
    }



      const handleUserJoined = async (user)=>{
        const audio = new Audio(InRoomSound);
        audio.volume = 0.1;
        audio.play();
  
      }
      const handleUserLeft=async(user)=>{
          delete audioTracks.remoteAudioTracks[user.uid]
      }
      let handleUserPublished = async (user, mediaType) => {
        await rtcClient.subscribe(user, mediaType);
    
        if (mediaType == "audio") {
          audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
          user.audioTrack.play();
        }
      }
    

      let initVolumeIndicator = async () => {

        //1
        AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
        rtcClient.enableAudioVolumeIndicator();
    
        //2
        rtcClient.on("volume-indicator", volumes => {
          let spUsers = [];
    
          volumes.forEach((volume) => {
            // console.log(`UID ${volume.uid} Level ${volume.level}`);
    
            if (volume.level >= 20) {
              spUsers.push(volume.uid); // Use push to add uid to the array
            }
          });
          // console.log("activeSpeaker : " ,spUsers);
          
          setSpeakers(spUsers);
        })
      }      
      useEffect(() => {
        if (rtcClient !== null) {
          rtcClient.on("user-published", handleUserPublished);
          rtcClient.on('user-left'  , handleUserLeft)

          initVolumeIndicator()
  
        }
      }, [rtcClient])

      useEffect(()=>{
          if (rtcClient){
            if (audioTracks.LocalAudioTrack) {
              audioTracks.LocalAudioTrack.setMuted(!mic); // Mute the track initially
              rtcClient.publish(audioTracks.LocalAudioTrack);       
          }  
          }
      } , [mic])

    

    useEffect(()=>{
      const roomID = localStorage.getItem('RoomID')
      setMicState(user.uid , roomID , !mic)
    } ,[mic , audioTracks.LocalAudioTrack])

    const value = {mic , setMic , ProfileOpen , setProfile   , RoomTitle , setPop , PopProfile , LeaveChanel , activeSpeakers , initRtc , chatting , setChatting}
  return (
    <roomContext.Provider value={value}>
                {children}
    </roomContext.Provider>
  )
}




export const  useRoomContext = ()=>{
        return useContext(roomContext)
}




export default RoomContextProvider
