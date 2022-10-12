const styles = {

    App: {
        fontFamily: "monospace",
    },

    gameName: {
        margin: 0,
        fontSize: "1em",
        fontWeight: 600,
    },

    board: {
        display: "grid",
        gridTemplateColumns: "200px 200px 200px",
    },

    playerList: {
        paddingLeft: "10px",
        margin: 0,
    },

    TextInput: {
        cssPosition: "fixed",
        top: "50%",
        left: "50%",
        // transform: "translate(-50%,-50%)",
        backgroundColor: "rgba(0,0,0,.7)",
        zIndex: 1000,
    },

    playerListItem: {
        margin: 0,
        padding: 0,
        fontSize: ".6em",
        fontWeight: 400,
    },

    playerListHeader: {
        margin: "5px 0px",
        fontSize: ".8em",
        fontWeight: 500,
    },

    creationTime: {
        padding: 0,
        margin: 0,
        fontSize: ".6em",
        fontWeight: 400,
    },

    disconnectButton: {
        margin: 3,
    },

    gameDetailContainer: {
        display: "flex",
    },

    gameListContainer: {
        width: "50%",
        margin: "auto",
    },

    joinButtonContainer: {
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto",
    },

    refreshButton: {
        margin: 3
    },

    Paper: {
        padding: "5px",
        margin: "10px 0px",
        backgroundColor: "#DDDDDD",
    },

    JoinButton: {
        alignContent: "right",
        alignSelf: "middle",
    },

    title: {
        fontFamily: "monospace",
        fontSize: "2em",
        fontWeight: "600",
    },

}

export default styles