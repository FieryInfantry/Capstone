import { StyleSheet } from 'react-native';

const AccountModalStyle = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  modalContainer: {
    width: "70%",
    height: "60%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",

  },
    title: {
      fontSize: 25,
      marginBottom: 10,
      justifyContent: "center",
      textAlign:"center",
      fontWeight:"bold"
    },
    accountButton: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#859F3D',
      alignItems: 'center',
      borderRadius: 10,
      
      
    },
    accountButtonText: {
      color : "#fff",
      fontSize: 15,
      
    },
    closeButton: {
      padding: 10,
      marginTop: 20,
      backgroundColor: 'red',
      alignItems: 'center',
      borderRadius: 10,
      

      
    },
    closeButtonText:{
        color: '#fff',
    }
   
  });
  
  export default AccountModalStyle;