const btn = {
    borderWidth: 2,
    borderColor: "#f9f9f9",
    backgroundColor: "#f1f3f4",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20
}

export default {
    container: {
        backgroundColor: "#ffffff",
        flex: 1
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flex: 1
    },
    button: btn,
    expression: {
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontSize: 40,
        lineHeight: 40,
        fontWeight: "bold",
        marginVertical: "auto"
    },
    result: {
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        lineHeight: 20,
        fontSize: 20
    },
    buttonEquals: {
        ...btn,
        backgroundColor: '#4285f4',
        color: "#ffffff",
        fontWeight: "bold"
    },
    buttonClear: {
        ...btn,
        backgroundColor: '#eb6161',
        color: "#ffffff"
    },
    buttonNumber: {
        ...btn,
        backgroundColor: '#ffffff'
    }
};


let colors = {
    bg,
    previewBg,
    equalsBg,
    clearBg,
    numberBg,
    buttonTextColor,
    numberButtonTextColor,
    clearButtonTextColor,
    equalsButtonTextColor,
    previewTextColor,
    expressionTextColor,
    borderWidth,
    borderColor
}