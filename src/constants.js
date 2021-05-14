const boxShadow =  '0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'

export const MAIN_STYLES = {
    button: {
        margin: '1em',
        backgroundColor: '#AAACCC',
        borderWidth: '0px',
        borderRadius: '15px',
        padding: '0.3em',
        paddingRight: '0.5em',
        paddingLeft: '0.5em',
        fontSize: '1.3em',
        color: '#36424e'
    },
    text: {
        margin: '1em',
        padding: '0.3em',
        fontSize: '1.3em',
        color: '#36424e'
    },
    highlightedText: {
        margin: '1em',
        backgroundColor: '#bab73d',
        borderWidth: '0px',
        borderRadius: '15px',
        fontSize: '1.3em',
        color: '#36424e'
    },
    offsetBlock: {
        marginLeft: '2em',
        width: '20em',
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
        boxShadow,
        flex: '1',
        borderRadius: '50px'
    },
    offsetBlockHorizontal: {
        marginLeft: '2em',
        width: '20em',
        display: 'flex',
        flexDirection: 'row',
        padding: '1em',
        boxShadow,
        flex: '1',
        height: '90%',
        borderRadius: '50px'

    },

    offsetBlockRounded: {
        marginLeft: '2em',
        display: 'flex',
        flexDirection: 'row',
        boxShadow,
        borderRadius: '80px',
        padding: '4em'
    },

    profileAvatar: {
        boxShadow,
        width: '250px',
        height: '250px',
        borderRadius: '125px',
        borderColor: 'white',
        borderWith: '1px'
    },
    friendAvatar: {
        width: '220px',
        height: '200px',
        backgroundColor: '#adc4ba',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px',
        borderRadius: '40px',
        boxShadow
    },
    textInput: {
        backgroundColor: '#efe8ef',
        borderWidth: '0px',
        borderRadius: '15px',
        overlay: 'none',
        padding: '0.3em'
    },
    dialog: {
        backgroundColor: '#AAACCC',
        border: '1px solid white',
        borderColor: '#cdb3b3',
        padding: '1em',
        fontSize: '1.3em',
        color: '#36424e',
        width: '200px',
    },
    story: {
        width:'4em',
        height:'4em',
        borderRadius: '2em',
        margin: '0.5em',
        boxShadow
    }
}




