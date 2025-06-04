import { Text, View, TouchableOpacity } from 'react-native';

const ParcelTypeSelector = ({
  options,
  selectedType,
  onSelect,
  styles,
  onReset,
}) => (
  <>
    <Text style={styles.label}>Parcel Type</Text>
    <View style={styles.parcelOptionsStyle}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => {
            onSelect(option);
            if (onReset) onReset();
          }}
        >
          <View style={styles.radioCircle}>
            {selectedType === option && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.optionLabel}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
);

export default ParcelTypeSelector;
