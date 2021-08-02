# React Native Scientific Calculator

## Installation
Using npm:
```sh
npm i react-native-scientific-calculator
```
or yarn:

```
yarn add react-native-scientific-calculator
```

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


### Screenshots
| Light Theme - Standard | Dark Theme - Standard | Dark Theme - Scientific |
| ---------------------- | --------------------- | ----------------------- |
| ![alt Select Package](https://raw.githubusercontent.com/rohangaikwad/react-native-scientific-calculator/main/assets/light-standard.jpg) | ![alt Select Package](https://raw.githubusercontent.com/rohangaikwad/react-native-scientific-calculator/main/assets/dark-standard.jpg) | ![alt Select Package](https://raw.githubusercontent.com/rohangaikwad/react-native-scientific-calculator/main/assets/dark-scientific.jpg) |



### Props


| Prop Name       | Data Type                                   | Default Value | Description                         |
| --------------- | ------------------------------------------- | ------------- | ----------------------------------- |
| theme           | string                                      | light         | Choose between `light` and `dark` themes |
| scientific      | boolean                                     | false         | Toggle between standard & scientific calculator  |
| showLiveResult  | boolean                                     | false         | Toggle live calculation preview     |
| haptics         | boolean                                     | true          | Enable vibration on button press    |
| customize       | Object                                      |               | Customize text & background colors. See below for list of possible customizations  |


### Customizations


| Prop Name             | Data Type         | Description                                      |
| --------------------- | ----------------- | ------------------------------------------------ |
| borderRadius          | number            | border radius of buttons                         |
| spacing               | number            | spacing between buttons                          |
| bg                    | string            | Calculator background color                      |
| buttonBg              | string            | Button background color                          |
| previewBg             | string            | Live calculations preview panel background color |
| borderColor           | string            | Background color of space between buttons        |
| equalsBg              | string            | Equals button background color                   |
| clearBg               | string            | Clear button background color                    |
| numberBg              | string            | Number buttons background color                  |
| displayBg             | string            | Results panel background color                   |
| buttonTextColor       | string            | Button texxt color                               |
| numberButtonTextColor | string            | Number button text color                         |
| clearButtonTextColor  | string            | Clear button text color                          |
| equalsButtonTextColor | string            | Equals button text color                         |
| previewTextColor      | string            | Preview text color                               |
| expressionTextColor   | string            | Expression text color         |
