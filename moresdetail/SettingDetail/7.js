import React, { useState } from "react";
import { Switch, View, Text,StyleSheet } from 'react-native';


const Set7 = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.warp}>
        <View style={styles.detailset1}>
          <Text style={styles.textset}>ปิดระบบแจ้งเตือน 60 นาที</Text>
        </View>
        <View>
          <Switch styles={styles.swit}
            trackColor={{ false: "#D3D3D3", true: "#ED1B24" }}
            thumbColor={isEnabled ? "#D3D3D3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled} />
        </View>
        
    </View>
  );
}
const styles = StyleSheet.create({
  warp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 15,
  },
  detailset1: {
    paddingLeft: 25,
    
  },
  textset: {
      fontSize: 16,  
  },
  swit: {
    flex: 1,
  },
})
export default Set7;