import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 50,
  },
  formContainer: {
    padding: 20,
    alignItems: 'flex-start',
  },
  appHeading: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    backgroundColor: '#6082B6',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Nunito_600SemiBold',
  },
  inputStyle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
  },
  parcelOptionsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 5,
  },
  buttonStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 45,
    borderRadius: 5,
    backgroundColor: '#6082B6',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Nunito_700Bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6082B6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#6082B6',
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderHeading: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Nunito_700Bold',
  },
  modalText: {
    fontSize: 14,
    color: '#818589',
    fontFamily: 'Nunito_400Regular',
  },
  orderText: {
    fontSize: 14,
    color: '#36454F',
    fontFamily: 'Nunito_400Regular',
  },
  totalStyle: {
    marginTop: 10,
    fontSize: 15,
    color: '#36454F',
    fontFamily: 'Nunito_700Bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  orderSummary: {
    marginTop: 30,
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 15,
  },
});

export default styles;