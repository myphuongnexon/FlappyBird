import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(null);

  useEffect(() => {
    setRunning(false);
  }, [])
  
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref)
        }}
        systems={[Physics]}
        entities={entities()} 
        running={running}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        onEvent = {(e) => {
          switch(e.type){
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              setCurrentPoints(0);
              break;

            case 'new_point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
      >

      </GameEngine>
      {!running ? 
      <View></View> 
    : null  }
      <StatusBar style="auto" />
    </View>
  );
}