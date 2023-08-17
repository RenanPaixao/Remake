import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type AccordionProps = {
  title: string;
  content: string;
};

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  // State to track whether the accordion is expanded or collapsed
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the accordion state
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {/* TouchableOpacity to make the title area clickable */}
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {/* Show either "plus" or "minus" icon based on the accordion state */}
          <View style={styles.buttons}>
            {expanded ? (
              <AntDesign name="minuscircleo" size={18} color="black" />
            ) : (
              <AntDesign name="pluscircleo" size={18} color="black" />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {/* Render the content only if the accordion is expanded */}
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
  },
  title: {
    flex: 1, // Use flex to allow the title to take available space
    fontSize: 18,
    textAlign: 'left',
  },
  buttons: {
    paddingLeft: 20,
  },
  content: {
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
  },
});

export default Accordion;
