import { StyleSheet } from 'react-native';

const AccountModalStyle = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: '#F6FCDF',
      padding: 20,
      justifyContent: 'center',
      textAlign: "center"
    },
    text1:{
      color: "white",
      fontSize: 15
    },
    title: {
      fontSize: 25,
      marginBottom: 10,
      justifyContent: "center",
      textAlign:"center",
      fontWeight:"bold",
      color:"#fff"
    },
    accountButton: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: 10,
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