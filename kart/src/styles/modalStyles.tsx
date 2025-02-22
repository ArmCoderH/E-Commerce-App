import { StyleSheet } from 'react-native';
import { Colors, screenHeight, screenWidth } from '../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

export const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: Colors.active,
        padding: 6,
        borderRadius: 30,
        zIndex: 10,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: RFValue(12),
        color: "#777",
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        height: 50,
        color: "#000",
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: RFValue(13),
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
    },
    textareainput: {
        height: 90,
        borderColor: '#ddd',
        color: "#000",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: RFValue(13),
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: Colors.active,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
    },
    cancelButton: {
        backgroundColor: '#FF5A5F',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: RFValue(15),
    },
    logoutButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.active,
    },
    logoutButtonText: {
        fontSize: RFValue(13),
        color: Colors.active,
        fontWeight: 'bold',
    },
});
