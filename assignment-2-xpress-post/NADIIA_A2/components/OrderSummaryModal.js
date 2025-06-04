import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const OrderSummaryModal = ({
  isVisible,
  onClose,
  onPay,
  modalData,
  styles,
}) => (
  <Modal isVisible={isVisible}>
    <View style={styles.modalContainer}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={styles.orderHeading}>Order Summary</Text>
      </View>
      <Text style={styles.label}>Sending Address</Text>
      <Text style={styles.modalText}>{modalData.sendAddress}</Text>
      <Text style={styles.label}>Destination Address</Text>
      <Text style={styles.modalText}>{modalData.destAddress}</Text>
      <Text style={styles.label}>Parcel Info</Text>
      <Text style={styles.modalText}>
        {modalData.parcelType}, {modalData.parcelWeight} lbs
      </Text>
      <View style={styles.orderSummary}>
        <View style={styles.detailItem}>
          <Text style={styles.modalText}>
            {modalData.parcelRateDetails
              ? modalData.parcelRateDetails.type
              : ''}
          </Text>
          <Text style={styles.modalText}>
            $
            {modalData.parcelRateDetails
              ? modalData.parcelRateDetails.cost
              : ''}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.modalText}>Signature Add-on</Text>
          <Text style={styles.modalText}>
            {`$${
              modalData.signatureCost
                ? Number(modalData.signatureCost).toFixed(2)
                : '0.00'
            }`}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailItem}>
          <Text style={styles.orderText}>Subtotal</Text>
          <Text style={styles.orderText}>${modalData.subtotal}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.orderText}>Tax</Text>
          <Text style={styles.orderText}>${modalData.tax}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.totalStyle}>Total</Text>
          <Text style={styles.totalStyle}>${modalData.total}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <TouchableOpacity style={styles.buttonStyle} onPress={onClose}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={onPay}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default OrderSummaryModal;
