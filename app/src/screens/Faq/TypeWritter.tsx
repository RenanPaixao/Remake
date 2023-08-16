import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TypeWriterProps {
  text: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const animateText = () => {
      const textArray = text.split('');
      let currentText = '';

      textArray.forEach((letter, i) => {
        setTimeout(() => {
          currentText += letter;
          setTypedText(currentText);
        }, 75 * i);
      });
    };

    animateText();
  }, [text]);

  return (
      <Text>{typedText}</Text>
  );
};

export default TypeWriter;
