// Camera.js
import React, { useState, useRef , useEffect} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet , Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { fonts } from '../css/styles';

const CameraModal = ({ isVisible, onClose, onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
     try{
      const data = await cameraRef.current.takePictureAsync();
      setImage(data.uri);
      
     } catch(e){
      console.log(e);
     }
    } 
  }

  const saveImage = async () => {
   if(image) {
    try{
     await MediaLibrary.createAssetAsync(image);
     alert('Foto guardada!')
     onPictureTaken(Image);
     setImage(null);
     onClose();
    }catch(e){
     console.log(e);
    }
   }
  }

  useEffect(() => {
   (async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasPermission(cameraStatus.status === 'granted');
   })();
  },[])

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
    >
      <View style={styles.container}>
        {!image?
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          onCameraReady={() => setHasPermission(true)}
        />
        :
       <Image source={{uri: image}} style={styles.camera}/>
       }
        <View>
          
          {image ?
          <View style={styles.buttonContainer}>
           <TouchableOpacity onPress={saveImage}>
            <Text style={[styles.buttonText, fonts.doubleHeaderRegular]}>Save</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => setImage(null)}>
           <Text style={[styles.buttonText, fonts.doubleHeaderRegular]}>Re-Take</Text>
           </TouchableOpacity>
          </View>
          :
          <View style={styles.buttonContainer}>
           <TouchableOpacity onPress={onClose}>
             <Text style={[styles.buttonText, fonts.doubleHeaderRegular]}>Close</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={takePicture}>
           <Text style={[styles.buttonText, fonts.doubleHeaderRegular]}>Take Picture</Text>
           </TouchableOpacity>
          </View>
          }
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    //borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingHorizontal: 50,
  },
  buttonText: {
    color: 'white',
  },
});

export default CameraModal;
