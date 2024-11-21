import { StyleSheet } from 'react-native';


const AlertModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    modalContent: {
      width: '80%',
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        justifyContent: "center",
        textAlign:"center",
        fontWeight:"bold",
        color:"#fff"
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      gap: 10,
    },
    deleteButton:{
      backgroundColor: '#859F3D',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    cancelButton:{
      
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
  });
  export default AlertModal;