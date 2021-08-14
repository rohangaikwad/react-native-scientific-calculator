import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Vibration, Platform, TextInput, PixelRatio } from "react-native";
import { create, all } from "mathjs";
import { ThemeContext } from "./ThemeContext";

const Mathjs = create(all);

const ln = (num) => Math.log(num);
ln.transform = (num) => ln(num);
Mathjs.import({ ln: ln })


const Calculators = ({ showLiveResult, scientific: showScientific, customize, theme, haptics, history, showTooltip }) => {
    const [expr, setExpr] = useState([0]);
    const [result, setResult] = useState(0);
    const [equalled, setEqualled] = useState(false);
    const [inverted, setInverted] = useState(false);
    const [tooltip, setTooltip] = useState("");
    const canVibrate = haptics || true;
    const historyEnabled = history || false;
    const tooltipEnabled = showTooltip || false;

    const { styles, customizeTheme, isLoading } = useContext(ThemeContext);

    useEffect(() => {
        customizeTheme({ theme, customize });
    }, [styles]);

    useEffect(() => {
        if (!showLiveResult) return;
        let res = result;
        try {
            res = Mathjs.evaluate(expr.join(""));
        } catch (error) {
            //console.log(error)
        }
        if (isNaN(res)) {
            //console.log("error occured1")
        } else {
            setResult(res);
        }
    }, [expr]);


    useEffect(() => {
        let handler;
        if (Platform.OS === "web") {
            handler = (e) => {
                if (e.key.toLowerCase() === "backspace") deleteHandler();
                if (e.key.toLowerCase() === "enter") calculate();
            };
            document.addEventListener("keyup", handler)
        }

        return () => {
            if (Platform.OS === "web") document.removeEventListener("keyup", handler);
        }
    }, [expr]);

    const Vibrate = () => {
        if (!canVibrate) return;
        Vibration.vibrate(20)
    }

    const calculate = () => {
        Vibrate();
        let res = result;
        try {
            res = Mathjs.evaluate(expr.join(""));
        } catch (error) {
            //console.log(error)
        }
        if (showLiveResult) {
            if (isNaN(res)) {
                console.log("error occured2")
            } else {
                setResult(res);
            }
        }
        if (isNaN(res)) {
            console.log("error occured3")
        } else {
            setExpr([res]);
        }
        setEqualled(true);
    }

    const numPressed = (val, tip = "") => {
        setTooltip(tip);
        Vibrate();
        if (equalled) {
            setExpr([val]);
        } else {
            if (expr.join() === "0") {
                setExpr([val]);
            } else {
                setExpr([...expr, val]);
            }
        }
        setEqualled(false);
        //calculate();
    }

    const buttonPressed = (val, tip = "") => {
        setTooltip(tip);
        Vibrate();
        setExpr([...expr, val]);
        setEqualled(false);
        //calculate();
    }

    const functionPressed = (val, tip = "") => {
        setTooltip(tip);
        Vibrate();
        if (equalled) {
            setExpr([val, ...expr, ')']);
        } else {
            if (expr.join("") === "0") {
                setExpr([val])
            } else {
                let last = [...expr].pop();
                if (isNaN(last)) {
                    setExpr([...expr, val])
                } else {
                    setExpr([...expr, "*", val])
                }
            }
        }
        //setExpr([...expr, val]);
        setEqualled(false);
        //calculate();
    }

    const deleteHandler = () => {
        Vibrate();
        if (expr.length > 0) {
            let _expr = [...expr];
            if (equalled) {
                let arr = Array.from(_expr.toString())
                arr.pop();
                _expr = [arr.join("")];
            } else {
                _expr.pop();
                if (_expr.length === 0) _expr.push(0)
            }
            setExpr(_expr);
        }
    }

    const clearHandler = () => {
        Vibrate();
        setExpr([0]);
    }

    const dotHandler = () => {
        Vibrate();
        if (equalled) {
            setExpr([0, "."]);
        } else {
            let index = expr.lastIndexOf(".");
            if (index > -1) {
                let num = expr.slice(index).join("");
                console.log(num)
                if (isNaN(num)) {
                    setExpr([...expr, "."]);
                }
            } else {
                setExpr([...expr, "."]);
            }
            console.log(index)
        }
        setEqualled(false);
    }

    const ToolTipHistory = () => <View style={{ flex: .5, backgroundColor: "blue" }}>
        <View style={styles.tooltipContainer}>
            {tooltipEnabled && <Text style={styles.tooltip}>{tooltip}</Text>}
            {historyEnabled && <TouchableOpacity style={{ ...styles.button, backgroundColor: "transparent", borderColor: "transparent" }} onPressIn={() => console.log("history")}>
                <StyledText style={styles.button}>◷</StyledText>
            </TouchableOpacity>}
        </View>
    </View>

    const Display = () => <View style={styles.display}>
        <TextInput
            onContentSizeChange={x => {
                //console.log(x)
            }}
            style={styles.expression}
            multiline={true}
            value={expr.join("")}
            textAlign="right"
            textAlignVertical="bottom"
            editable={false} />
        {showLiveResult && <Text style={styles.result}>{result}</Text>}
    </View>

    const StyledText = ({ children: _children, style }) => {
        return <Text style={{ color: style.color, fontSize: style.fontSize, fontWeight: style.fontWeight }}>{_children}</Text>
    }

    const Invertable = ({ style, yes, no }) => {
        return inverted
            ? <TouchableOpacity style={style} onPressIn={yes.onPress}>
                {yes.children}
            </TouchableOpacity>
            : <TouchableOpacity style={style} onPressIn={no.onPress}>
                {no.children}
            </TouchableOpacity>
    }

    const SuperScriptText = ({ style, text, supText }) => <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <StyledText style={style}>{text}</StyledText>
        <Text style={{ fontSize: style.fontSize * 0.6, color: style.color }}>{supText}</Text>
    </View>

    const Scientific = () => <View style={{ flex: 3 }}>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPressIn={() => numPressed("deg")}>
                <StyledText style={styles.button}>deg</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => numPressed("rad")}>
                <StyledText style={styles.button}>rad</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => numPressed("π", `π = ${22 / 7}`)}>
                <StyledText style={styles.button}>π</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => numPressed("e", `e = ${Math.E}`)}>
                <StyledText style={styles.button}>e</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("exp(", "exp(x) - e to the power of x")}>
                <StyledText style={styles.button}>Exp</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="sin" supText="-1" />,
                    onPress: () => functionPressed("asin(")
                }}
                no={{
                    children: <StyledText style={styles.button}>sin</StyledText>,
                    onPress: () => functionPressed("sin(")
                }}
            />
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="cos" supText="-1" />,
                    onPress: () => functionPressed("acos(")
                }}
                no={{
                    children: <StyledText style={styles.button}>cos</StyledText>,
                    onPress: () => functionPressed("cos(")
                }}
            />
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="tan" supText="-1" />,
                    onPress: () => functionPressed("atan(")
                }}
                no={{
                    children: <StyledText style={styles.button}>tan</StyledText>,
                    onPress: () => functionPressed("tan(")
                }}
            />
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("ln(", "Natural Log(x)")}>
                <StyledText style={styles.button}>ln</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("log(")}>
                <StyledText style={styles.button}>log</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="sinh" supText="-1" />,
                    onPress: () => functionPressed("asinh(")
                }}
                no={{
                    children: <StyledText style={styles.button}>sinh</StyledText>,
                    onPress: () => functionPressed("sinh(")
                }}
            />
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="cosh" supText="-1" />,
                    onPress: () => functionPressed("acosh(")
                }}
                no={{
                    children: <StyledText style={styles.button}>cosh</StyledText>,
                    onPress: () => functionPressed("cosh(")
                }}
            />
            <Invertable style={styles.button}
                yes={{
                    children: <SuperScriptText style={styles.button} text="tanh" supText="-1" />,
                    onPress: () => functionPressed("atanh(")
                }}
                no={{
                    children: <StyledText style={styles.button}>tanh</StyledText>,
                    onPress: () => functionPressed("tanh(")
                }}
            />
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("atan2(")}>
                <StyledText style={styles.button}>atan2</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: inverted ? styles.buttonNumber.backgroundColor : styles.button.backgroundColor }} onPressIn={() => setInverted(!inverted)}>
                <StyledText style={styles.button}>INV</StyledText>
            </TouchableOpacity>
        </View>
    </View>

    const Actions = () => <View style={{ flex: 5 }}>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("sqrt(", "square root = √x")}>
                <StyledText style={styles.button}>√</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => buttonPressed("(", `long press for entering ")"`)} onLongPress={() => buttonPressed(")")} >
                <StyledText style={styles.button}>( )</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("!", "Factorial")}>
                <StyledText style={styles.button}>n!</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("%", " x % y (x modulo y)")}>
                <StyledText style={styles.button}>%</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("/")}>
                <StyledText style={styles.button}>÷</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPressIn={() => functionPressed("cbrt(", "cube root = ∛x")}>
                <StyledText style={styles.button}>∛</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("7")}>
                <StyledText style={styles.buttonNumber}>7</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("8")}>
                <StyledText style={styles.buttonNumber}>8</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("9")}>
                <StyledText style={styles.buttonNumber}>9</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("*")}>
                <StyledText style={styles.button}>×</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("^", "x^y (x raised to the power of y)")}>
                <SuperScriptText style={styles.button} text="x" supText="y" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("4")}>
                <StyledText style={styles.buttonNumber}>4</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("5")}>
                <StyledText style={styles.buttonNumber}>5</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("6")}>
                <StyledText style={styles.buttonNumber}>6</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("-")}>
                <StyledText style={styles.button}>−</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.buttonClear} onPressIn={() => deleteHandler()}>
                <StyledText style={styles.buttonClear}>Del</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("1")}>
                <StyledText style={styles.buttonNumber}>1</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("2")}>
                <StyledText style={styles.buttonNumber}>2</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("3")}>
                <StyledText style={styles.buttonNumber}>3</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed("+")}>
                <StyledText style={styles.button}>+</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.buttonClear} onPressIn={clearHandler}>
                <StyledText style={styles.buttonClear}>AC</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => dotHandler()}>
                <StyledText style={styles.button}>.</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPressIn={() => numPressed("0")}>
                <StyledText style={styles.buttonNumber}>0</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPressIn={() => buttonPressed(",")}>
                <StyledText style={styles.button}>,</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEquals} onPressIn={() => calculate()}>
                <StyledText style={styles.buttonEquals}>=</StyledText>
            </TouchableOpacity>
        </View>
    </View>

    return (
        !isLoading && <View style={styles.container}>
            {(tooltipEnabled || historyEnabled) && <ToolTipHistory />}
            <Display />
            <View style={{ position: "relative", flex: 7 }}>
                {showScientific && <Scientific />}
                <Actions />
            </View>
        </View>
    );
}

export default React.memo(Calculators);