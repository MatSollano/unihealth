// // components/AppointmentCard.tsx
// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// type Appointment = {
//   doctorName: string;
//   specialty: string;
//   clinic: string;
//   address: string;
//   date: string;
//   time: string;
//   status: string;
//   image?: any;
// };

// const AppointmentCard: React.FC<Appointment> = ({
//   doctorName,
//   specialty,
//   clinic,
//   address,
//   date,
//   time,
//   status,
//   image,
// }) => {
//   return (
//     <View style={styles.card}>
//         {image && <Image source={image} style={styles.image} />}
//         <View style={[styles.info, !image && styles.noImageInfo]}>

//         <View style={styles.topContainer}>
//             <Text style={styles.doctor}>{doctorName}</Text>
//             <Text style={styles.rate}>Rate</Text>
//         </View>
//         <Text style={styles.specialty}>{specialty}</Text>

//         <Text style={styles.clinic}>{clinic}</Text>
//         <Text style={styles.address}>{address}</Text>

//         <Text style={styles.datetime}>{date} {time}</Text>
        
//         <View style={styles.bottomContainer}>
//             <Text style={[styles.status, status === 'Canceled' && styles.canceled]}>
//             {status}
//             </Text>
//             <Text style={styles.viewDetails}>View Details</Text>
//         </View>
        
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     marginHorizontal: wp('0.5%'),
//     marginBottom: hp('2%'),
//     borderRadius: wp('3%'),
//     padding: wp('4%'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   image: {
//     width: wp('18%'),
//     height: wp('18%'),
//     borderRadius: wp('9%'),
//     marginRight: wp('4%'),
//   },
//   info: {
//     flex: 1,
//   },
//   doctor: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//   },
//   specialty: {
//     fontSize: wp('3.5%'),
//     color: '#666',
//   },
//   rate: {
//     fontSize: wp('3.5%'),
//     color: '#666',
//   },
//   viewDetails: {
//     fontSize: wp('3.5%'),
//     color: '#666',
//   },
//   clinic: {
//     fontSize: wp('3.5%'),
//     marginTop: hp('0.5%'),
//   },
//   address: {
//     fontSize: wp('3.2%'),
//     color: '#888',
//   },
//   datetime: {
//     fontSize: wp('3.5%'),
//     marginTop: hp('0.5%'),
//   },
//   status: {
//     fontSize: wp('3.5%'),
//     fontWeight: 'bold',
//     color: '#22c55e',
//     marginTop: hp('0.5%'),
//   },
//   canceled: {
//     color: '#ef4444',
//   },
//   noImageInfo: {
//     marginLeft: 0,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   topContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });

// export default AppointmentCard;

// components/Appointments/AppointmentCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Appointment = {
  doctorName: string;
  specialty: string;
  clinic: string;
  address: string;
  date: string;
  time: string;
  status: string;
  image?: any;
  onRatePress?: () => void;
};

const AppointmentCard: React.FC<Appointment> = ({
  doctorName,
  specialty,
  clinic,
  address,
  date,
  time,
  status,
  image,
  onRatePress,
}) => {
  return (
    <View style={styles.card}>
      {image && <Image source={image} style={styles.image} />}
      <View style={[styles.info, !image && styles.noImageInfo]}>
        <View style={styles.topContainer}>
          <Text style={styles.doctor}>{doctorName}</Text>
          <TouchableOpacity onPress={onRatePress}>
            <Text style={styles.rate}>Rate</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.specialty}>{specialty}</Text>
        <Text style={styles.clinic}>{clinic}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.datetime}>{date} {time}</Text>

        <View style={styles.bottomContainer}>
          <Text style={[styles.status, status === 'Canceled' && styles.canceled]}>{status}</Text>
          <Text style={styles.viewDetails}>View Details</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: wp('0.5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('3%'),
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    marginRight: wp('4%'),
  },
  info: {
    flex: 1,
  },
  doctor: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  specialty: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  rate: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  viewDetails: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  clinic: {
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  address: {
    fontSize: wp('3.2%'),
    color: '#888',
  },
  datetime: {
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  status: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: hp('0.5%'),
  },
  canceled: {
    color: '#ef4444',
  },
  noImageInfo: {
    marginLeft: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AppointmentCard;
