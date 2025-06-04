import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import styles from './styles/AppStyles';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import ParcelTypeSelector from './components/ParcelTypeSelector';
import RateDropdown from './components/RateDropdown';
import OrderSummaryModal from './components/OrderSummaryModal';

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [sendingAddress, setSendingAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [selectedParcelType, setSelectedParcelType] = useState('Package');
  const [parcelWeight, setParcelWeight] = useState('');
  const [weightError, setWeightError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedParcelRateType, setSelectedParcelRateType] = useState(null);
  const [selectedRateDetails, setSelectedRateDetails] = useState(null);
  const [signatureOption, setSignatureOption] = useState(false);
  const [signature, setSignature] = useState(0.0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const parcelOptions = ['Package', 'Letter or Document'];

  const packageRates = [
    { type: 'Standard', cost: 12.99 },
    { type: 'Xpress Post', cost: 18.99 },
    { type: 'Priority Post', cost: 24.99 },
  ];

  const letterRates = [
    { type: 'Standard', cost: 4.99 },
    { type: 'Xpress Post', cost: 9.99 },
    { type: 'Priority Post', cost: 14.99 },
  ];

  const maxWeightPackage = 44.0;
  const maxLetterWeight = 1.1;
  const signatureCost = 2.0;
  const addressPattern = /^\d+\s+[\w\s]+\s*,\s*[\w\s]+$/;

  const handleWeightChange = (text) => {
    setParcelWeight(text);

    if (text.trim() === '') {
      setWeightError('');
      return;
    }

    const weight = parseFloat(text);

    if (isNaN(weight) || weight <= 0) {
      setWeightError('Please enter a valid weight.');
      return;
    }

    let maxWeight = 0.0;
    if (selectedParcelType === 'Package') {
      maxWeight = maxWeightPackage;
    } else if (selectedParcelType === 'Letter or Document') {
      maxWeight = maxLetterWeight;
    }

    if (weight > maxWeight) {
      setWeightError(
        `Max weight for ${selectedParcelType} is ${maxWeight} lbs`
      );
    } else {
      setWeightError('');
    }
  };

  const handleSignatureChange = () => {
    const newValue = !signatureOption;
    setSignatureOption(newValue);
    if (newValue) {
      setSignature(signatureCost);
    } else {
      setSignature(0.0);
    }
  };

  const handleRateChange = (type) => {
    const selectedRates =
      selectedParcelType === 'Package' ? packageRates : letterRates;
    const rate = selectedRates.find((r) => r.type === type);

    setSelectedParcelRateType(type);
    setSelectedRateDetails(rate || null);
  };

  const handleButtonClick = () => {
    if (!addressPattern.test(sendingAddress)) {
      Alert.alert(
        'Error',
        'Please type a valid Sending Address before proceeding.'
      );
      return;
    } else if (!addressPattern.test(destinationAddress)) {
      Alert.alert(
        'Error',
        'Please type a valid Destination Address before proceeding.'
      );
      return;
    } else if (sendingAddress === destinationAddress) {
      Alert.alert(
        'Error',
        'Please type valid Sending and Destination Addresses before proceeding.'
      );
      return;
    }

    if (weightError !== '') {
      Alert.alert(
        'Error',
        'Please ensure the weight of the parcel is within the limits.'
      );
      return;
    }

    if (!selectedRateDetails || typeof selectedRateDetails.cost !== 'number') {
      Alert.alert(
        'Error',
        'Please select a valid Parcel Rate before proceeding.'
      );
      return;
    }

    const subtotalCalc = selectedRateDetails.cost + signature;
    const taxCalc = subtotalCalc * 0.13;
    const totalCalc = subtotalCalc + taxCalc;

    setModalData({
      sendAddress: sendingAddress,
      destAddress: destinationAddress,
      parcelType: selectedParcelType,
      parcelWeight: parcelWeight,
      parcelRateDetails: selectedRateDetails,
      signatureCost: signature,
      subtotal: subtotalCalc.toFixed(2),
      tax: taxCalc.toFixed(2),
      total: totalCalc.toFixed(2),
    });
    setIsModalVisible(() => !isModalVisible);
  };

  if (!fontsLoaded) {
    return null;
  } else {
    // UI or View
    return (
      <View style={styles.container}>
        <Text style={styles.appHeading}>Xpress Post</Text>

        <View style={styles.formContainer}>
          {/* Sending Address */}
          <Text style={styles.label}>Sending Address</Text>
          <TextInput
            style={styles.inputStyle}
            value={sendingAddress}
            placeholder="Ex. 51 River St, Greenville"
            onChangeText={setSendingAddress}
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={50}
          />

          {/* Destination Address */}
          <Text style={styles.label}>Destination Address</Text>
          <TextInput
            style={styles.inputStyle}
            value={destinationAddress}
            onChangeText={setDestinationAddress}
            placeholder="Ex. 20 King St, Orangeville"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="words"
            maxLength={50}
          />

          {/* Parcel Type */}
          <ParcelTypeSelector
            options={parcelOptions}
            selectedType={selectedParcelType}
            onSelect={(option) => setSelectedParcelType(option)}
            onReset={() => {
              setSelectedParcelRateType(null);
              setSelectedRateDetails(null);
              setParcelWeight('');
              setWeightError('');
            }}
            styles={styles}
          />

          {/* Parcel Weight */}
          <Text style={styles.label}>Parcel Weight, lbs</Text>
          <TextInput
            style={[
              styles.inputStyle,
              { borderColor: weightError === '' ? '#ccc' : '#b6505e' },
            ]}
            value={parcelWeight}
            onChangeText={handleWeightChange}
            placeholder="Enter parcel weight in lbs"
            keyboardType="number-pad"
          />
          {weightError ? (
            <Text style={{ color: '#b6505e', marginTop: 4 }}>
              {weightError}
            </Text>
          ) : null}

          {/* Choose Rate */}
          <Text style={styles.label}>Choose Rate</Text>
          {selectedParcelType === 'Package' && (
            <RateDropdown
              open={openDropdown}
              value={selectedParcelRateType}
              rates={packageRates}
              setOpen={setOpenDropdown}
              onChange={handleRateChange}
              styles={styles}
            />
          )}
          {selectedParcelType === 'Letter or Document' && (
            <RateDropdown
              open={openDropdown}
              value={selectedParcelRateType}
              rates={letterRates}
              setOpen={setOpenDropdown}
              onChange={handleRateChange}
              styles={styles}
            />
          )}

          {/* Signature Add-on */}
          <Text style={styles.label}>Add-on</Text>
          <View style={styles.switchContainer}>
            <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
              Signature ($2) {signatureOption ? 'Opted-in' : 'Opted-out'}
            </Text>
            <Switch
              value={signatureOption}
              onValueChange={handleSignatureChange}
              trackColor={{ false: '#ccc', true: '#6082B6' }}
              thumbColor={signatureOption ? '#6082B6' : '#b6505e'}
            />
          </View>

          {/* Get Rate Button */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleButtonClick}
            >
              <Text style={styles.buttonText}>Get Rate</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for Order Summary */}
          <OrderSummaryModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            modalData={modalData}
            styles={styles}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
};

export default App;
