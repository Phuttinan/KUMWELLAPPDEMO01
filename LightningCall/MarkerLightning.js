import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { Image, StyleSheet} from 'react-native';

function LightningMarker(props) {
    const { dataLightnings } = props;

    let dateLightnings = new Date(dataLightnings.DAT)
    let uTimeLightning = Math.floor(dateLightnings.getTime()/1000);
    let fiveMinCount = uTimeLightning + 300;
    let tenMinCount = uTimeLightning + 600;
    let fifteenMinCount = uTimeLightning + 900;
    let uTimeNow = (Date.now()/1000)    //console.log(unixTimestamp)
    //console.log(Date.now())

    if (dataLightnings.TYP === "1"){
      if (fiveMinCount > uTimeNow) {
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CR.png')}
          />
        )
      }
      else if (tenMinCount > uTimeNow){
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CO.png')}
          />
        )
      }
      else if (fifteenMinCount > uTimeNow){
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CY.png')}
          />
        )
      }
    }
    else if (dataLightnings.TYP === "2") {
      if (fiveMinCount > uTimeNow) {
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CCR.png')}
          />
        )
      }
      else if (tenMinCount > uTimeNow){
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CCO.png')}
          />
        )
      }
      else if (fifteenMinCount > uTimeNow){
        return (
          <Marker 
            coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
            tracksViewChanges={false} icon={require('../image/lightning_icon/K_ICON_CCY.png')}
          />
        )
      }
    }

    // return (
    // <Marker 
    //   coordinate={{latitude : parseFloat(dataLightnings.LAT), longitude : parseFloat(dataLightnings.LON)}}
    //   tracksViewChanges={false} icon={require('../image/lightning_icon/4.png')}
    // />);

    
}

const styles = StyleSheet.create({
    markerImage: {
      width: 30,
      height: 30
    }
  });

export default LightningMarker;

/*
const data_default = {
  "DAT": "2022-08-23T16:46:08.682+00:00",
  "LON": "104.9967",
  "LAT": "13.7332",
  "TYP": "1",
  "HEI": "0.0",
  "AMP": "-20.3",
  "ERR": "0.393"
}
*/