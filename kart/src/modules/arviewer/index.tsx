import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { 
  Viro360Image, 
  Viro3DObject, 
  ViroAmbientLight, 
  ViroARScene, 
  ViroARSceneNavigator, 
  ViroOmniLight, 
  ViroQuad, 
  ViroSpotLight 
} from '@reactvision/react-viro';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Camera Permission Granted');
    } else {
      console.log('❌ Camera Permission Deniede');
    }
  }
};

const ARWorldScene = () => {
  console.log('✅ AR Scene Loaded');

  return (
    <ViroARScene>
      {/* Debugging for 360 Image */}
      {console.log('🖼️ Loading 360 Background Image')}
      <Viro360Image 
        source={require('@assets/images/360.jpg')}
        onLoadEnd={() => console.log('✅ 360 Image Loaded')}
        onError={(error) => console.error('❌ 360 Image Load Error:', error)}
      />

      {/* Ambient Light */}
      <ViroAmbientLight color='#ffffff' />

      {/* Debugging for 3D Model */}
      {console.log('🦾 Loading 3D Object')}
      <Viro3DObject
        source={require('@assets/3dmodels/blackpanther/object_bpanther_anim.vrx')}
        resources={[
          require('@assets/3dmodels/blackpanther/object_bpanther_Base_Color.png'),
          require('@assets/3dmodels/blackpanther/object_bpanther_Metallic.png'),
          require('@assets/3dmodels/blackpanther/object_bpanther_Mixed_AO.png'),
          require('@assets/3dmodels/blackpanther/object_bpanther_Normal_OpenGL.png'),
          require('@assets/3dmodels/blackpanther/object_bpanther_Roughness.png'),
        ]}
        position={[0, -3.5, -9]}
        rotation={[0, 0, 0]}
        scale={[4, 4, 4]}
        type="VRX"
        dragType="FixedToWorld"
        onDrag={() => console.log('🎮 Object Dragged')}
        onLoadEnd={() => console.log('✅ 3D Model Loaded')}
        onError={(error) => console.error('❌ 3D Model Load Error:', error)}
      />

      {/* Omni Light */}
      <ViroOmniLight
        intensity={300}
        position={[10, -10, 1]}
        color={'#FFFFFF'}
        attenuationEndDistance={30}
        attenuationStartDistance={20}
      />

      {/* Spot Light */}
      <ViroSpotLight
        position={[0, 8, -2]}
        color="#ffffff"
        direction={[0, -1, 0]}
        intensity={50}
        attenuationEndDistance={10}
        attenuationStartDistance={5}
        outerAngle={20}
        castsShadow={true}
      />

      {/* Floor Shadow */}
      <ViroQuad
        rotation={[-90, 0, 0]}
        position={[0, -1.6, 0]}
        width={5}
        height={5}
        arShadowReceiver={true}
      />
    </ViroARScene>
  );
};

const ARViewer: FC = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    requestCameraPermission().then(() => setIsPermissionGranted(true));
  }, []);

  if (!isPermissionGranted) {
    console.log('⏳ Waiting for Camera Permission...');
    return <View style={styles.container} />;
  }

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: ARWorldScene }}
      removeClippedSubviews
      renderToHardwareTextureAndroid
      style={styles.f1}
    />
  );
};

export default ARViewer;

const styles = StyleSheet.create({
  f1: { flex: 1 },
  container: { flex: 1, backgroundColor: 'black' },
});
