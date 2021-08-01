## Installation
Using npm:
```sh
npm i react-native-scientific-calculator
```
or yarn:

```
yarn add react-native-scientific-calculator

### Usage

```js
import React from 'react';
import { View } from 'react-native';
import Calculator from 'react-native-scientific-calculator';

const App = () => {
    return (
        <View style={{flex: 1}}>
            <Calculator
                showLiveResult={true} 
                scientific={true}
                theme="dark"
                customize={{
                    borderRadius: 5,
                    spacing: 2
                }}
            />
        </View>
    )
}

export default App;
```

# react-native-scientific-calculator