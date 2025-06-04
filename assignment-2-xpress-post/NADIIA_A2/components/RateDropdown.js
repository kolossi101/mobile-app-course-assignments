import DropDownPicker from 'react-native-dropdown-picker';

const RateDropdown = ({ open, value, rates, setOpen, onChange, styles }) => (
  <DropDownPicker
    open={open}
    value={value}
    items={rates.map((rate) => ({
      label: `${rate.type} ($${rate.cost.toFixed(2)})`,
      value: rate.type,
    }))}
    setOpen={setOpen}
    setValue={(callbackOrValue) => {
      // callbackOrValue can be a function or value
      if (typeof callbackOrValue === 'function') {
        onChange(callbackOrValue(value));
      } else {
        onChange(callbackOrValue);
      }
    }}
    setItems={() => {}}
    placeholder="Select rate..."
    style={{ borderColor: '#ccc', marginTop: 5 }}
    textStyle={styles.optionLabel}
    dropDownContainerStyle={{ borderColor: '#ccc' }}
  />
);

export default RateDropdown;
