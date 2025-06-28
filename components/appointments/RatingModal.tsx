import React, { useState } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { X, Star } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const tagsList = ['Professional', 'On time', 'Great communication', 'Helpful', 'Friendly', 'Knowledgeable'];

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  doctorName: string;
  onSubmit: (rating: number, tags: string[], comment: string) => void;
}

export function RatingModal({ visible, onClose, doctorName, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating !== 0) {
      onSubmit(rating, selectedTags, comment);
      setRating(0);
      setSelectedTags([]);
      setComment('');
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <X size={wp('5.5%')} color="#6B7280" />
          </TouchableOpacity>

          <Text style={styles.title}>Rate your experience</Text>
          <Text style={styles.subtitle}>with {doctorName}</Text>

          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Star
                  size={wp('7%')}
                  color="#FBBF24"
                  fill={i <= rating ? "#FBBF24" : "transparent"}
                  style={{ marginHorizontal: wp('1%') }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tagsContainer}>
            {tagsList.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.tagTextSelected,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Share your experience (optional)"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: wp('85%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('5%'),
    position: 'relative',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: wp('3%'),
    right: wp('3%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '600',
    marginTop: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#6B7280',
    marginBottom: hp('2%'),
  },
  stars: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  tag: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    margin: wp('1%'),
  },
  tagSelected: {
    backgroundColor: '#E0E7FF',
    borderColor: '#6366F1',
  },
  tagText: {
    fontSize: wp('3.5%'),
    color: '#374151',
  },
  tagTextSelected: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    minHeight: hp('10%'),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    fontSize: wp('3.8%'),
    marginBottom: hp('2%'),
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#004D80',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2.5%'),
  },
  submitText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '500',
    alignSelf: 'center'
  },
});